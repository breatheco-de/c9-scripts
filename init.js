({
    name: 'c9Scripts',
    init: function() {
        this.addMenus(this);
        this.doInstallOrUpgradeIfHostedWorkspace(this);
    },
    addMenus(self){
        self.console.log(self,'addMenus');
        // Add a custom top-level menu to the menu bar.
        // Add commands and dividers to this menu.
        var menuCaption = "Breathe Code";     // Menu caption.
        var menus = services["menus"];    // Access the menu bar.
        menus.remove('Support');
        menus.remove('Run');
        
        var MenuItem = services.MenuItem; // Use this to create a menu item.
        var Divider = services.Divider;   // Use this to create a menu divider.

        // Set the top-level menu caption.
        menus.setRootMenu(menuCaption, 900, plugin);

        // Add a Saturday menu command to the menu.
        // When the user chooses this command, run the chooseWeekendDay function,
        // passing in the string Saturday.
        menus.addItemByPath(menuCaption + "/Student Platform", new MenuItem({
          onclick: () => self.newTab('https://student.breatheco.de')
        }), 100, plugin);

        menus.addItemByPath(menuCaption + "/Assets", new MenuItem({
          onclick: () => self.newTab('https://breatheco.de/en/assets/')
        }), 100, plugin);

    },
    newTab(url){
        // services["dialog.alert"].show("Results", "Which day?",
        //     "You chose " + day + ".");
        window.open(url);
    },
    git: {
        getClone: function(self) {
            return '/home/ubuntu/c9-scripts';
        },
        getRemote: function(self) {
            return 'git@github.com:fnkr/c9-scripts.git';
        }
    },
    console: {
        getPrefix: function(self) {
            return '[' + self.name + ']';
        },
        log: function(self, args) {
            console.log.apply(console, [self.console.getPrefix(self)].concat(args));
        },
        error: function(self, args) {
            console.error.apply(console, [self.console.getPrefix(self)].concat(args));
        }
    },
    notification: {
        error: (self, err) => services['dialog.error'].show(err)
    },
    onError: function(self, err) {
        self.console.error(self, err);
        self.notification.error(self, self.name + ' failed: ' + err.message);
    },
    doInstallOrUpgradeIfHostedWorkspace: function(self) {
        self.console.log(self, 'doInstallOrUpgradeIfHostedWorkspace');

        services.proc.execFile('sh', {
            args: ['-c', 'echo -n "$C9_HOSTNAME"'], cwd: '/'
        }, (err, stdout, stderr) => self.doInstallOrUpgradeIfHostedWorkspaceCallback(self, err, stdout, stderr));
    },
    doInstallOrUpgradeIfHostedWorkspaceCallback: function(self, err, stdout, stderr) {
        self.console.log(self, 'doInstallOrUpgradeIfHostedWorkspaceCallback');

        if (err) {
            return self.onError(self, err);
        }

        if (stdout.endsWith('.c9users.io')) {
            self.doInstallOrUpgrade(self);
        }
    },
    doInstallOrUpgrade: function(self) {
        self.console.log(self, 'doInstallOrUpgrade');

        services.proc.execFile('test', {
            args: ['-d', self.git.getClone()], cwd: '/'
        }, (err, stdout, stderr) => self.doInstallOrUpgradeCallback(self, err, stdout, stderr));
    },
    doInstallOrUpgradeCallback: function(self, err, stdout, stderr) {
        self.console.log(self, 'doInstallOrUpgradeCallback');

        if (err && (err.code == 1)) {
            // not installed
            self.doClone(self);
        } else if (err) {
            // error
            self.onError(self, err);
        } else {
            // installed
            self.doUpgrade(self);
        }
    },
    doClone: function(self, callback) {
        self.console.log(self, 'doClone');

        services.proc.execFile('git', {
            args: ['clone', self.git.getRemote(), self.git.getClone()], cwd: '/'
        }, (err) => self.doCloneCallback(self, err));
    },
    doCloneCallback: function(self, err) {
        self.console.log(self, 'doCloneCallback');

        if (err) {
            return self.onError(self, err);
        }

        self.doInstall(self);
    },
    doUpgrade: function(self) {
        self.console.log(self, 'doUpgrade');

        services.proc.execFile('git', {
            args: ['pull'], cwd: self.git.getClone()
        }, (err) => self.doUpgradeCallback(self, err));
    },
    doUpgradeCallback: function(self, err) {
        self.console.log(self, 'doUpgradeCallback');

        if (err) {
            return self.onError(self, err);
        }

        self.doInstall(self);
    },
    doInstall: function(self) {
        self.console.log(self, 'doInstall');

        services.proc.execFile('bash', {
            args: ['./install'], cwd: self.git.getClone()
        }, (err) => self.doInstallCallback(self, err));
    },
    doInstallCallback: function(self, err) {
        self.console.log(self, 'doInstallCallback');

        if (err) {
            return self.onError(self, err);
        }
    }
}).init();