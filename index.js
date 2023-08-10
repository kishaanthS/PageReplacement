let pageno = document.getElementById("inputtext");
let ref_string = document.getElementById("string");
let addbtn = document.getElementById("addbutton");
let clearbtn = document.getElementById("clearbutton");
let grids = document.getElementById("grids");
let fifo = document.getElementById("fifo");
let lru = document.getElementById("lru");
let opr = document.getElementById("opr");
let nopagefault = document.getElementById("nopagefault");
let cur_ele = document.getElementById("black-box");
let slidevar = document.getElementById("slidebar");
let algo = document.getElementById("algorithm");
let best = document.getElementById("best");
let compare = document.getElementById("compare");
let values  = document.getElementById("values");



let frameSize;
let reference_string  = [];
let cache = [];
let flag = true;
let pagefaults = 0;
let no_execution = 1;
let comparison_arr = [];
let bestFlag = 0;


pageno.addEventListener("keypress",function(event){
    if(event.key === "Enter"){
        addbtn.click();
    }
})

function sleep(ms){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        },ms)
    })
}


clearbtn.addEventListener("click",function(){
    reference_string = [];
    ref_string.innerHTML="Reference String : ";
})

addbtn.addEventListener("click",function(){
    if(flag){
            let val = parseInt(pageno.value);
            if(!Number.isNaN(val)){
                reference_string.push(parseInt(pageno.value));
                let str = "Reference String : ";
                for(let i = 0; i < reference_string.length ; i++){
                    str += reference_string[i] + " ";
                }
                ref_string.textContent= str;
            }
            pageno.value = "";  
    }
    else{
        if(no_execution) alert(" Your program is already running ! ! ! ");
    }
})


best.addEventListener("click",async function(){
    comparison_arr = []
    if(flag){
        if(!reference_string.length){
            alert("No reference string is given ! ! !");
            return ;
        }
        bestFlag=1;
        algo.innerHTML = "";
        compare.style.opacity="0";
        no_execution=0;
        cur_ele.style.opacity = ".2";
        fifo.click();
        cur_ele.innerHTML ="";
        lru.click();
        cur_ele.innerHTML ="";
        opr.click();
        cur_ele.innerHTML ="";
        let idx = 0;
        for (let i = 0 ; i < 3 ; i++){
            if(comparison_arr[i] < comparison_arr[idx]){
                idx = i;
            }
        }

        compare.innerHTML = "The Best Page Replacement Algorithm for the given string is : ";
        if(idx===0){
            compare.innerHTML += "First In First Out";
        }
        else if(idx===1){
            compare.innerHTML += "Least Recently Used";
        }
        else if(idx===2){
            compare.innerHTML += "Optimal Page Replacement";
        }
        compare.style.opacity="1";
        cur_ele.style.opacity = "1";
        alert("Execution is Finished");
        no_execution = 1;
        flag=true;
    }
    else{
        if(no_execution) alert("Your program is already running!!!");
    }
    bestFlag = 0;
})

 

function gridformation(frameSize){
    compare.style.opacity = 0;
    let len = reference_string.length;
    for(let i = 0 ; i < len ; i++){
        let grid = document.createElement("div");
        for(let j = 0 ; j < frameSize ; j++){
            let cell = document.createElement("div");
            cell.style.height="60px";
            grid.appendChild(cell);
            cell.innerHTML = "..";
            cell.style.fontSize = "30px";
            cell.style.textAlign="center";
            cell.id = i+"item"+j;
            cell.style.border = "skyblue 10px solid";
        }
        grid.style.margin = "40px 30px 0px 0";
        grids.appendChild(grid);
    }
    let str="";
    if(len>=9 && len<16){
        len = len/2;
    }
    else if(len>=16){
        len/=3;
    }
    for(let i=0 ;i < len; i++){
        str += 100 + "px ";
    }
    grids.style.gridTemplateColumns = str;
}



fifo.addEventListener("click", async function(){
    if(flag){
        if(!reference_string.length){
            alert("No reference string is given ! ! !");
            return ;
        }
        frameSize = prompt("Please Enter the frame size : ");
        if(frameSize==0){
            alert('Enter frame size ! ! !')
            return;
        }
        flag=false;
        grids.replaceChildren();
        pagefaults = 0;
        if(no_execution) {
            algo.innerHTML = "FIRST IN FIRST OUT ALGORITHM";
            gridformation(frameSize);
            nopagefault.innerHTML = "Number of Page Faults : ";
        }
        for(let i = 0 ; i < reference_string.length ; i++){
            let pre=0;
            let fl = false;
            if(no_execution){
                cur_ele.innerHTML = reference_string[i];
                await sleep(slidevar.value*-1);
                for(let j = 0 ; j < cache.length ; j++){
                    let idx = document.getElementById(i+"item"+j);
                    idx.innerHTML = cache[j].element;
                }
            }
            for(let j = 0; j < cache.length ; j++){
                if(parseInt(cache[j].element)==parseInt(reference_string[i])){
                    fl=true;
                    if(no_execution){
                        let idx = document.getElementById(i+"item"+j);
                        idx.style.backgroundColor = "lightseagreen";
                        idx.style.color = "white";
                        
                        await sleep(slidevar.value*-1+1000);
                    }
                    break;
                }
                else{
                    if(cache[j].index < cache[pre].index){
                        pre = j;
                    }
                }
            }
            if(!fl){
                let idx;
                if(cache.length==frameSize){
                    cache[pre].index = i;
                    cache[pre].element = reference_string[i];
                    if(no_execution){
                        idx=document.getElementById(i+"item"+pre);
                        idx.style.backgroundColor = "red";
                        await sleep((slidevar.value)*-1+1000);
                        idx.innerHTML = reference_string[i];
                        idx.style.backgroundColor = "lightseagreen";
                        await sleep(slidevar.value*-1+1000);
                        idx.style.backgroundColor = "red";
                    }
                }
                else{
                    if(no_execution){
                        idx = document.getElementById(i+"item"+cache.length);
                        idx.style.backgroundColor = "red";
                        idx.innerHTML = reference_string[i];
                    }
                    cache.push({index : cache.length , element : reference_string[i]});
                }
                pagefaults++;
                if(no_execution) {
                    idx.style.color = "white";
                    
                    nopagefault.innerHTML = "Number of Page Faults : ";
                    nopagefault.innerHTML += pagefaults;
                    await sleep(slidevar.value*-1);
                }
            }  
        }
        comparison_arr.push(pagefaults);
        cache = [];
        flag=true;
        cur_ele.innerHTML="";
        if(reference_string.length && no_execution) alert("Execution is Finished");
    }
    else{
        if(no_execution) alert(" Your program is already running ! ! ! ");
    }
})






lru.addEventListener("click",async function(){
    if(flag){
        if(!reference_string.length){
            alert("No reference string is given ! ! !");
            return ;
        }
        if(!bestFlag){
            frameSize = prompt("Please Enter the frame size : ");
            if(frameSize==0){
                alert('Enter frame size ! ! !')
                return;
            }
        }   
        flag=false;
        if(no_execution){
            algo.innerHTML = "LEAST RECENTLY USED ALGORITHM";
            grids.replaceChildren();
            gridformation(frameSize);
            nopagefault.innerHTML = "Number of Page Faults : ";
        }
        pagefaults = 0;
        for(let i = 0 ; i < reference_string.length ; i++){
            let pre=0;
            let fl = false;
            if(no_execution){
                cur_ele.innerHTML = reference_string[i];
                await sleep(slidevar.value*-1);
                
                for(let j = 0 ; j < cache.length ; j++){
                    let idx = document.getElementById(i+"item"+j);
                    idx.innerHTML = cache[j].element;
                }
            }
            for(let j = 0; j < cache.length ; j++){
                if(parseInt(cache[j].element)===parseInt(reference_string[i])){
                    if(no_execution){
                        let idx = document.getElementById(i+"item"+j);
                        idx.style.backgroundColor = "lightseagreen";
                        idx.style.color = "white";
                        
                        await sleep(slidevar.value*-1+1000);
                    }
                    cache[j].index=i;
                    fl=true;
                    break;
                }
                else{
                    if(cache[j].index < cache[pre].index){
                        pre = j;
                    }
                }
            }
            if(!fl){
                let idx;
                if(cache.length==frameSize){
                    cache[pre].index = i;
                    cache[pre].element = reference_string[i];
                    if(no_execution){
                        idx=document.getElementById(i+"item"+pre);
                        idx.style.backgroundColor = "red";
                        await sleep(slidevar.value*-1+1000);
                        idx.innerHTML = reference_string[i];
                        idx.style.backgroundColor = "lightseagreen";
                        await sleep(slidevar.value*-1+1000);
                        idx.style.backgroundColor = "red";
                    }
                }
                else{
                    if(no_execution){
                        idx = document.getElementById(i+"item"+cache.length);
                        idx.style.backgroundColor = "red";
                        idx.innerHTML = reference_string[i];
                    }
                    cache.push({index : cache.length , element : reference_string[i]});
                }
                if(no_execution) {
                    idx.style.color = "white";
                }
                pagefaults++;
                if(no_execution){
                    nopagefault.innerHTML = "Number of Page Faults : ";
                    nopagefault.innerHTML += pagefaults;
                    await sleep(slidevar.value*-1);
                }
            }  
        }
        comparison_arr.push(pagefaults);
        cache = [];
        flag=true;
        cur_ele.innerHTML="";
        if(reference_string.length && no_execution) alert("Execution is Finished");
    }
    else{
        if(no_execution) alert(" Your program is already running ! ! ! ");
    }
})



opr.addEventListener("click",async function(){
    if(flag){
        if(!reference_string.length){
            alert("No reference string is given ! ! !");
            return ;
        }
        if(!bestFlag){ 
            frameSize = prompt("Please Enter the frame size : ");
            if(frameSize==0){
                alert('Enter frame size ! ! !')
                return;
            }
        }
        flag=false;
        pagefaults = 0;
        if(no_execution){
            algo.innerHTML = "OPTIMAL PAGE REPLACEMENT ALGORITHM";
            grids.replaceChildren();
            gridformation(frameSize);
            nopagefault.innerHTML = "Number of Page Faults : ";
        }
        for(let i = 0 ; i < reference_string.length ; i++){
            let fl = false;
            if(no_execution){
                cur_ele.innerHTML = reference_string[i];
                await sleep(slidevar.value*-1);
                for(let j = 0 ; j < cache.length ; j++){
                    let idx = document.getElementById(i+"item"+j);
                    idx.innerHTML = cache[j];
                }
            }
            for(let j = 0 ; j < cache.length ; j++){
                if(parseInt(cache[j])===parseInt(reference_string[i])){
                    if(no_execution){
                        let idx = document.getElementById(i+"item"+j);
                        idx.style.backgroundColor = "lightseagreen";
                        idx.style.color = "white";
                        await sleep(slidevar.value*-1+1000);
                    }
                    fl=true;
                    break;
                }
            }
            if(!fl){
                let idx;
                if(cache.length==frameSize){
                    let temp = [];
                    for(let k = 0 ; k < cache.length; k++){
                        let flag = false;
                        for(let j = i+1; j < reference_string.length ; j++){
                            if(parseInt(cache[k])===parseInt(reference_string[j])){
                                temp.push(j);
                                flag  = true;
                                break;
                            }
                        }
                        if(!flag){
                            temp.push(100);
                        }
                    }
                    let index = 0;
                    for(let j = 0 ; j < temp.length ; j++){
                        if (temp[j] > temp[index]){
                            index = j;
                        }
                    }
                    cache[index] = reference_string[i];
                    if(no_execution) idx=document.getElementById(i+"item"+index);
                }
                else{
                    if(no_execution) idx = document.getElementById(i+"item"+cache.length);
                    cache.push(reference_string[i]);
                }
                if(no_execution){
                    idx.innerHTML = reference_string[i];
                    idx.style.backgroundColor = "red";
                    idx.style.color = "white";
                    await sleep(slidevar.value*-1+1000);
                }
                pagefaults++;
                if(no_execution){
                    nopagefault.innerHTML = "Number of Page Faults : ";
                    nopagefault.innerHTML += pagefaults;
                    await sleep(slidevar.value*-1);
                }
            }
        }
        comparison_arr.push(pagefaults);
        cache = [];
        flag=true;
        cur_ele.innerHTML="";
        if(reference_string.length && no_execution) alert("Execution is Finished");
        
    }
    else{
        if(no_execution) alert("Your program is already running!!!");
    }
})