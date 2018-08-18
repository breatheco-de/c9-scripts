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
        }
    ]
};
