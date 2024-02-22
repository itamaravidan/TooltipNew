// structure of the content
const content = {
    first : {
        title: "first",
        desc : "desc", 
        innercontent : [
            {
                title : "abc",
                text : "lore lore lore lore  lore lore lore lore lore lore ",
            },
            {
                title : "def",
                text : "lore lore lore lore  lore lore lore lore lore lore ",
            },
            {
                title : "123",
                text : "lore lore lore lore  lore lore lore lore lore lore ",
            }
        ]
    },
    second : {
        title: "second", 
        desc : "desc",
        innercontent : [
            {
                title : "abc",
                text : "lore lore lore lore  lore lore lore lore lore lore ",
            },
            {
            title : "def",
            text : "lore lore lore lore  lore lore lore lore lore lore ",
            },
            {
            title : "123",
            text : "lore lore lore lore  lore lore lore lore lore lore  ",
            }
        ]
    },
    third : {
        title: "third", 
        descOne : "lore lore lore lore  lore lore lore lore lore lore ",
        descTwo : "lore lore lore lore  lore lore lore lore lore lore "
    },
    fourth : {
        title: "fourth",
        desc : "lore lore lore lore  lore lore lore lore lore lore ",
        descDetail: ["desc1", "desc2", "desc3", "desc4", "desc5", "desc6"], 
    }
}

//select the tooltip and the svg
const toolTip = document.querySelector("#tooltip");
const svg = document.querySelector("svg");

function createTooltip () {
    // set the counter used for the grid area
    let counter = 0;

    //create the title
    const title = document.createElement("p");
    title.textContent = "Improvements";
    title.id = "title";
    //give a grid-area property of item0
    title.style = "grid-area: item" + counter;

    toolTip.appendChild(title)
    

    for (let key in content) {
        counter += 1;

        //create an inner div in each loop
        const innerdiv = document.createElement('div');

        //give a grid-area property of item + counter
        innerdiv.style = "grid-area: item" + counter;

        //set a variable, to be reusable
        const currentObj = content[key];

        if (key == "first" || key == "second") {
            const paraTitle = document.createElement('p');
            paraTitle.textContent = currentObj["title"];
            const paraDesc = document.createElement('p');
            paraDesc.textContent = currentObj["desc"];

            innerdiv.append(paraTitle, paraDesc);

            const currentObjInnerContent = currentObj["innercontent"]

            for (let i = 0; i < currentObjInnerContent.length; i++) {
                const innercontentdiv = document.createElement('div');

                innercontentdiv.classList.add("innercontentdiv");
                const paraTitleInner = document.createElement('p');
                paraTitleInner.textContent = currentObjInnerContent[i]["title"];
                const paraDescInner = document.createElement('p');
                paraDescInner.textContent = currentObjInnerContent[i]["text"];

                innercontentdiv.append(paraTitleInner, paraDescInner);
                innerdiv.appendChild(innercontentdiv);
            }
        } else if (key == "third") {
            for (let innerkey in currentObj){
                const innerpara = document.createElement('p');
                innerpara.textContent = currentObj[innerkey];
                innerdiv.append(innerpara);
            }
        } else if (key == "fourth") {
            for (let innerkey in currentObj){
                if (innerkey == "descDetail") {
                    const innerlist = document.createElement('ol');
                    innerlist.dir = "rtl";
                    for (let element of currentObj["descDetail"]) {
                        const inneritemlist = document.createElement('li');
                        inneritemlist.textContent = element
                        innerlist.appendChild(inneritemlist)
                    }
                    innerdiv.append(innerlist);
                } else {
                    const innerpara = document.createElement('p');
                    innerpara.textContent = currentObj[innerkey];
                    innerdiv.append(innerpara);
                }
            }
        }
    toolTip.appendChild(innerdiv);
    }
};

createTooltip()


function changeStyle () {
    const rect = toolTip.getBoundingClientRect();
    svg.style.top = rect.height + rect.top - 20 + "px";
    svg.style.left = rect.width + rect.left - 20 + "px";

    const triangle = document.querySelector("#triangle");
    triangle.style.top = rect.height + rect.top - 10 + "px";
    triangle.style.left = rect.width + rect.left - 39.5 + "px";
}

//when the content of the page is loaded call the function changeStyle
document.addEventListener("DOMContentLoaded", () => {
    changeStyle();
})

//when the window is resized call the function changeStyle
window.addEventListener('resize', () => {
    changeStyle()
})

const varForEvents = [svg, toolTip];

//add events for the tooltip and svg
varForEvents.forEach((element) => {
    element.addEventListener('mouseover', (e) => {
        toolTip.style.visibility = 'visible';
    });
    element.addEventListener('mouseout', (e) => {
        toolTip.style.visibility = 'hidden';
    });
    element.addEventListener('mousemove', () => {
        toolTip.style.visibility = 'visible';
    });
})