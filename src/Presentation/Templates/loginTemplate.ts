export const loginTemplate = `
  <article class="page__container">
  <h1>Login</h1>
  <form id="login__form" class="form" testID="login__form">
    <div class="form__field">
      <label class="form__field__label" for="email">Email</label
      ><input
        id="email"
        name="email"
        type="text"
        class="form__field__input"
        placeholder="Email"
      />
      <p id="email__error" class="input__error__label"></p>
    </div>
    <div class="form__field">
      <label class="form__field__label" for="password">Password</label
      ><input
        id="password"
        name="password"
        type="password"
        class="form__field__input"
        placeholder="Password"
      />
      <p id="password__error" class="input__error__label"></p>
    </div>
    <p id="form__error" class="input__error__label"></p>
    <button type="submit" class="form__submit__button">Login</button>
  </form>
  </article>
`;
