return function(self, services, plugin){
    const tabs = services.console.getTabs();
    if(tabs.length>0){
        tabs[0].meta.$ignore = true;
        tabs[0].close();
    }
};
