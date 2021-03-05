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
    <h2>This is the homepage for customers.</h2>
    <Button className={css({ margin: "20px" })}>I am a button from Uber</Button>
  </div>
</PageLayout>
```
