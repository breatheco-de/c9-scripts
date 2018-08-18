let actions = {
    openTab(url){
        window.open(url);
    }
};

return {
    items: [
        {
            path: "/Student Platform",
            actions: {
                onclick: () => actions.openTab('https://student.breatheco.de')
            }
        },
        {
            path: "/Browse Assets",
            actions: {
                onclick: () => actions.openTab('https://breatheco.de/en/assets/')
            }
        },
        {
            path: "/Boilerplates",
            items: [
                {
                    path: "/vanilla-js",
                    actions: {
                        onclick: () => actions.openTab('https://github.com/4GeeksAcademy/vanillajs-hello')
                    }
                },
                {
                    path: "/react",
                    actions: {
                        onclick: () => actions.openTab('https://github.com/4GeeksAcademy/react-hello')
                    }
                },
                {
                    path: "/react-flux",
                    actions: {
                        onclick: () => actions.openTab('https://github.com/4GeeksAcademy/react-hello-flux')
                    }
                }
            ]
        }
    ]
};
