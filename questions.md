**1. What is the difference between Component and PureComponent? Give an example where it might break my app.**

In React, All Components are the function of the state, that means a component will re-render by default whenever it’s state or props changes. In case of child component, it will always re-render whenever it’s parent component re-render.

In case of PureComponent it will do a shallow comparison on both props and state in it’s shouldComponentUpdate method and component will only re-render in case there is change in props or state.PureComponent is useful to optimise performance and to reduce unnecessary re-render.

PureComponent does a shallow comparison, if in some cases you are passing nested objects or arrays as props and some changes happen in your deep nested objects, re-rendering will be missed completely as shallow comparison won’t be able to catch nested props changes.

**2. Context + ShouldComponentUpdate might be dangerous. Why is that?**

If a component is subscribed to context, it will re-render whenever the there is a change in context. If the component is also using shouldComponentUpdate, it might not re-render when it should, because shouldComponentUpdate doesn't have access to the context, like nextProps and nextState.

But this issue was during the legacy Context API, this issue has been fixed now with the introduction of new Context API with `withContext` hook.

**3. Describe 3 ways to pass information from a component to its PARENT.**

- Via setState hook. We can pass setState hook from parent to child and call that in child component and pass the data that needs to be passed to it’s parent component.
- We can use Context API as to pass data from child component and those data can be accessed via useContext hook in the parent component.
- We can use any global state manager like Redux to pass data between child and parent.
- We can use a common HOC between parent and child and call any method or state updater from child and the value can be accessed via props in parent component.

**4. Give 2 ways to prevent components from re-rendering.**

- Using `React.memo`

  As we already know a React component re-renders whenever there is a change in state and all of it’s descendants will also re-render alongside. But in some cases child component does not need to re-render if the state changed in parent component and it is not being used by the child component.

  To prevent this kind of re-rendering we can use `React.memo`, `React.memo` will make sure to re-render the component only when it’s props are changed.

- Using `useMemo/useCallback`

  If any child component is wrapped using React.memo and it accept some props which are non primitive, we should always use `useMemo` for values and `useCallback` for functions before passing them as props. As non-primitive props are compared via references, on every re-render it will get new references and component will re-render regardless of whether it’s actual props have changed or not. So we should always use `useMemo/useCallback` in these scenarios.

**5. What is a fragment and why do we need it? Give an example where it might break my app.**

Fragment is a React feature that allow us to group multiple elements without adding any extra node in the DOM tree.

In React to return multiple element you need to group them in a single parent element. Fragment helps to achieved this without adding any extra div and makes the render tree clean and efficient. Having smaller DOM tree will makes rendeirng faster and will use less memory.

**6. Give 3 examples of the HOC pattern.**

- `withAuthentication` component

Authentication is a common logic that needs to checked on multiple component, so we can use a common HOC for this purpose.

- To render common components, `withDisplayModal`, `withChatbot` etc

If some components needs to rendered on many places, like a sidebar or modal, we can use a HOC for this type of pattern as well to avoid repetition. Something like useModal can be used across different pages to render modal based on some page level action.

- For Global Error handling `withErrorBoundary`

Error handling is a app-level requirement, so we can use a Global HOC component to handling any kind of error and show appropriate error message to users.
**7. What's the difference in handling exceptions in promises, callbacks and async...await?**

- In promises we can use `.catch()` block to catch any error, `.then()` method runs for any successfull promise and if something goes wrong `.catch()` will run.

```
fetch('API_ENDPOINT')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // retunrn response from here
  })
  .catch(error => {
	// We can handle any error inside this block
    console.error('Error fetching data:', error);
  });
```

- Callback typically accept two arguments, one is for error and one is for data, if there is no error we return null in first argument and data is sent in the second argument.

```
function fetchData(callback) {
  // Some API call
  setTimeout(() => {
    const error = 'Error fetching data';
    const data = error ? null : 'Mock data';
    callback(error, data);
  }, 1000);
}

// accessing the erri
fetchData((error, data) => {
  if (error) {
    console.log('Error fetching data:', error);
  } else {
    // Handle data
  }
});

```

- In `Async/await` error handling is done using `try/catch` blocks, `catch` block will run if something goes wrong in the `try` block.

```
async function fetchData() {
  try {
    const response = await fetch('API_ENDPOINT');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Handle data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();

```

**8. How many arguments does setState take and why is it async.**

The `setState()` method in React takes two arguments. The first argument is the new state that needs to be updated. The second is a callback function that is called after the component has been re-rendered with the new state.

Internally React does not apply the state changes immediately,it queues all the setState calls and batches multiple updates together for better performance.

So, even if we are calling multiple setState together in a component, React passes it into one single `setState()` to prevent re-rendering due to multiple `setState()` calls. For this performance gain setState has to be async.

**9. List the steps needed to migrate a Class to Function Component.**

- Get rid of the Class keyword and use convert it to a function.
- Migrate all the state variables to use `useState` hook.
- Check for `componentDidMount`, and replace it with `useEffect` with empty dependency array.
- Check for `componentDidUpdate` and replace it with `useEffect` with a dependency array, check for the dependency for which componentDidUpdate Is being called and add that dependency in that useEffect dependency array.
- Check for c`omponentWillUnmount`, if it is being used add the same code in the return method of the `useEffect`.
- If Class based component is using `PureComponent`, replace it with `React.memo`

**10.List a few ways styles can be used with components.**

- Using external stylesheet.
- Using a CSS library like Tailwind which give us utility classes for styling.
- Using CSS in JS method with Style components or any other library.
- Using any external component library like MUI, Shadcn, Chakra UI etc

**11. How to render an HTML string coming from the server.**

We can use `dangerouslySetInnerHTML` to render any HTML string directly.Here is an example on how we can use this

```
import  React  from  "react";

const  App  =  ()  =>  {
	return  (
		<div  dangerouslySetInnerHTML={{  __html:  "<strong>strong text</strong>"  }}  />
	)
};
export  default  App;
```
