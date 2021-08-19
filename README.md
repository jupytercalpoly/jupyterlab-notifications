# jupyterlab_notifications

![Github Actions Status](https://github.com/jupytercalpoly/jupyterlab-notifications.git/workflows/Build/badge.svg)[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/jupytercalpoly/jupyterlab-notifications.git/main?urlpath=lab)

Toast notifications for JupyterLab


### Press Release

## JupyterLab Notifications

A notification system for JupyterLab
 
Would you like to have customizable notifications from notebooks and other extensions while working inside JupyterLab? Well, now you can! JupyterLab Notifications provides a notification system for JupyterLab that includes the ability for extensions to send notifications to users as well as a platform where users can get back to past notifications.
 
Notifications are often seen as an annoyance to users because they don’t want to be constantly reminded of trivial updates. However, without a notification system in place there is no way for users to be aware of updates from the app. Currently, there is no notification system in JupyterLab. Today, users need to go into each of their Jupyter notebooks and manually check to find relevant events or updates by collaborators. Also, JupyterLab extensions can’t communicate with their users across tabs or applications to provide relevant updates like cell execution in notebooks.
 
JupyterLab Notifications provides the ability for any extension in JupyterLab to send notifications to users. Notifications will present themselves for a set timeframe, but they can also be manually dismissed to ensure they won’t hinder the user’s view. Notifications contain information to call users to action, inform them of system updates, and other announcements, thus further establishing a collaborative environment among JupyterLab users. The Notifications extension makes it possible for all collaborators to receive a visible notification of their progress. This improved notification system will support passive pop-up toast-style notifications. However, users can customize the settings to control notifications to either pop-up with toast notifications or go straight to the notification center. Through toast notifications, multiple updates can be batched together based on the JupyterLab extension or collaborator. By doing so, the number of notifications will be dramatically decreased. While an integrated notification center allows users to look back on notifications, they might have missed and flag particular notifications for later. To improve the user’s experience, the notification system is customizable for users to choose the types of notifications they prefer to receive and their frequency.
 
“Notifications allows users to receive current updates within JupyterLab and stay aware of what their fellow collaborators are working on. Users from all experience levels are now able to easily use our notification center to better communicate with their colleagues.”
—Jupyter Developer
 
To get started as a user, install the JupyterLab Notifications extension and begin receiving notifications from your favorite JupyterLab extensions!
 
To get started as a developer, install the extension and use a simple and straightforward API to send notifications to users. 
 
"The JupyterLab Notifications extension has changed my Jupyter experience for the better! It makes sure I get updates on the progress of my teammates in real-time, so I can never miss a moment."  
—JupyterLab Notifications User 
 
Are you ready to never miss out on any updates in JupyterLab? Make sure to download JupyterLab Notifications today!



## Requirements

* JupyterLab >= 3.0

## Install

To install the extension, execute:

```bash
pip install jupyterlab_notifications
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab_notifications
```


## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_notifications directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm run build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlab_notifications
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlab-notifications` within that folder.
