# page-layout component

## Simple Usage

```jsx
<PageLayout
  title="Customer"
  bottomButtonLabel="Click Me!"
  onBottomBtnClicked={() => alert("Bottom Clicked")}
>
  <div>Your content goes here....</div>
</PageLayout>
```

## Custom Bottom

If you don't want to use a button at the bottom you can provide your own custom component using the `bottom` render prop.

```js
<PageLayout
  title="Customer"
  bottom={() => (
    <div>
      My Custom Component <h1>Hello!</h1>
    </div>
  )}
>
  <div>
    <div>Your content goes here....</div>
  </div>
</PageLayout>
```

## Hide the back button

```js
<PageLayout backButtonVisible={false} title="Curbside"></PageLayout>
```
