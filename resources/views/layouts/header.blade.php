<nav class="navbar has-shadow is-spaced is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <span class="navbar-item">
            <img src="/images/Vegetarian.svg" width="48" height="48">
            COOK-A-LOT
        </span>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div class="navbar-end">
        <div class="navbar-item">
            <div class="buttons">
                <a class="button is-primary">
                    <strong>@{{$t('sign_up')}}</strong>
                </a>
                <a class="button is-light">
                    @{{$t('log_in')}}
                </a>
            </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
            <span class="icon button is-light">
                <i class="material-icons md-dark">
                    translate
                </i>
            </span>

            <language-select></language-select>
        </div>
    </div>
</nav>