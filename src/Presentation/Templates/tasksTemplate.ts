export const tasksTemplate = `
    <h1>Tasks</h1>
    <article class="page__container">
    <header></header>
    <section class="new__task__form">
        <h2 id="task_form_header">Add new Tasks</h2>
        <form class="form" action="post" id="task_form">
        <div class="form__field">
            <label class="form__field__label" for="title">Title</label
            ><input
            id="title"
            name="title"
            type="text"
            class="form__field__input"
            placeholder="Title"
            maxlength="100"
            />
            <p id="title_error" class="input__error__label"></p>
        </div>
        <div class="form__field">
            <label class="form__field__label" for="password">Description</label
            ><textarea
            id="description"
            name="description"
            class="form__field__input"
            placeholder="Description"
            rows="4"
            cols="80"
            maxlength="300"
            ></textarea>
            <p id="description_length">0/300</p>
            <p id="description_error" class="input__error__label"></p>
        </div>
        <div class="form__field">
            <label class="form__field__label" for="password">Date</label
            ><input
            id="date"
            name="date"
            type="date"
            class="form__field__input"
            placeholder="Date"
            />
            <p id="date_error" class="input__error__label"></p>
        </div>
        <input
            type="hidden"
            id="save_action"
            name="save_action"
            value="add"
        />
        <input type="hidden" id="task_id" name="task_id" />
        <p id="form__error" class="input__error__label"></p>
        <button type="submit" class="form__submit__button">Save</button>
        </form>
    </section>
    <section class="tasks__list__container">
        <h2>My Tasks</h2>
        <div id="tasks__list"></div>
    </section>
    </article>
`;
