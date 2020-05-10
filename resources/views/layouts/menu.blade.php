<div class="box">
    <aside class="menu">
        <div class="menu-list">
            <router-link to="/" class="menu-item" exact>
                <span class="icon is-small">
                    <i class="material-icons md-18">
                        dashboard
                    </i>
                </span>
                <span class="icon-label">
                    @{{$t('dashboard')}}
                </span>
            </router-link>
            <router-link to="/recipes" class="menu-item">
                <span class="icon is-small">
                    <i class="material-icons md-18">restaurant
                    </i>
                </span>
                <span class="icon-label">
                    @{{$t('recipes')}}
                </span>
            </router-link>
            <router-link to="/lists" class="menu-item">
                <span class="icon is-small">
                    <i class="material-icons md-18">
                        shopping_basket
                    </i>
                </span>
                <span class="icon-label">
                    @{{$t('shopping_lists')}}
                </span>
            </router-link>
            <router-link to="/pantry" class="menu-item">
                <span class="icon is-small">
                    <i class="material-icons md-18">
                        all_inbox
                    </i>
                </span>
                <span class="icon-label">
                    @{{$t('pantry')}}
                </span>
            </router-link>
            <router-link to="/menus" class="menu-item">
                <span class="icon is-small">
                    <i class="material-icons md-18">
                        room_service
                    </i>
                </span>
                <span class="icon-label">
                    @{{$t('menus')}}
                </span>
            </router-link>
            <router-link to="/notebook" class="menu-item">
                <span class="icon is-small">
                    <i class="material-icons md-18">
                        book
                    </i>
                </span>
                <span class="icon-label">
                    @{{$t('notebook')}}
                </span>
            </router-link>
            <router-link to="/groups" class="menu-item">
                <span class="icon is-small">
                    <i class="material-icons md-18">
                        group
                    </i>
                </span>
                <span class="icon-label">
                    @{{$t('groups')}}
                </span>
            </router-link>
        </div>
    </aside>
</div>
