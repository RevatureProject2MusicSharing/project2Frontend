# Managing Global State with React Context

In order to manage global state in the application, we are using **React Context**. This allows us to change the global state in a reactive way so that changes automatically update all components that are using that state. 

To use React Context in your component, you just need to import the `useAppContext` hook from `AppContext.tsx` in the Components folder.

## Using the Context in Your Component

If your component needs to change the current song or interact with other global state, here's how you can use the context.

### Example:

``` typescript jsx
import { useAppContext } from '../AppContext/AppContext';

const YourComponent: React.FC = () => {
    
    // Initialize context (Always make sure this is called at the top level of your component because it's a hook)
    const context = useAppContext();

    // Logs the user out
    context.logout();

    // Logs the user in
    context.login();

    // Changes the current song (this takes the "videoId", which is the string after the "=" in the YouTube link.
    // For example, the link to this example song was "https://www.youtube.com/watch?v=wbE8FQDUbx8")
    context.setCurrentSong("wbE8FQDUbx8");

    return(
        // Your JSX here
    )
}
```
Right now the context only accounts for whether the user is logged in and the current song. It might be useful to also track the current playlist so when you hit the skip song button, the app can automatically move to the next or previous song in the playlist.