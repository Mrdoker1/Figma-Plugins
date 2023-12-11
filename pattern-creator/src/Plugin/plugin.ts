export {};

figma.showUI(__html__);

function getRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

figma.ui.onmessage = msg => {
    if (msg.type === 'cancel') {
        figma.closePlugin();
    }

    if (msg.type === 'create-pattern') {

        if (figma.currentPage.selection.length > 1) {

            const nodes = [];

            for (let i = 0; i < msg.height; i++) {

                for (let j = 0; j < msg.width; j++) {

                    const duplicate = figma.currentPage.selection[getRandom(0, figma.currentPage.selection.length)].clone();

                    duplicate.name = `${msg.sectionName}` + ` ${nodes.length}`;

                    duplicate.x = 0;
                    duplicate.y = 0;

                    duplicate.x = duplicate.width * i;
                    duplicate.y = duplicate.height * j;

                    figma.currentPage.appendChild(duplicate);
                    nodes.push(duplicate);

                }
            }

            if (msg.randRotation) {

                nodes.forEach((child: any, index) => {

                    const easyRand = getRandom(-2, 2) * 90;
                    // const fullRand = getRandom(-180, 180);

                    child.rotation = easyRand;

                    if ((child.rotation === -180) || (child.rotation === 180)) {
                        child.x = child.x + child.width
                        child.y = child.y + child.height;
                    } else if (child.rotation === -90) {
                        child.x = child.x + child.width;
                    } else if (child.rotation === 90) {
                        child.y = child.y + child.height;
                    }

                    // console.log('Rotation for' + ` ${msg.sectionName} ` + `${index}` + ':' + ` ${child.rotation}`);
                })
            }

            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);

        } else {
            figma.notify('You need to select at least 2 frames!');
        }
    }
};