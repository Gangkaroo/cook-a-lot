<div class="box">
    <aside class="menu">
        <div class="menu-list">
            <router-link to="/" class="menu-item" exact>
                <span class="icon is-medium">
                    <span class="mdi mdi-view-dashboard"></span>
                </span>
                <span>
                    @{{$t('dashboard')}}
                </span>
            </router-link>
            <router-link to="/recipes" class="menu-item">
                <span class="icon is-medium">
                    <span class="mdi mdi-silverware-fork-knife"></span>
                </span>
                <span>
                    @{{$t('recipes')}}
                </span>
            </router-link>
            <router-link to="/lists" class="menu-item">
                <span class="icon is-medium">
                    <span class="mdi mdi-cart"></span>
                </span>
                <span>
                    @{{$t('shopping_lists')}}
                </span>
            </router-link>
            <router-link to="/pantry" class="menu-item">
                <span class="icon is-medium">
                    <span class="mdi mdi-inbox-multiple"></span>
                </span>
                <span>
                    @{{$t('pantry')}}
                </span>
            </router-link>
            <router-link to="/menus" class="menu-item">
                <span class="icon is-medium">
                    <span class="mdi mdi-room-service"></span>
                </span>
                <span>
                    @{{$t('menus')}}
                </span>
            </router-link>
            <router-link to="/notebook" class="menu-item">
                <span class="icon is-medium">
                    <span class="mdi mdi-book-open"></span>
                </span>
                <span>
                    @{{$t('notebook')}}
                </span>
            </router-link>
            <router-link to="/groups" class="menu-item">
                <span class="icon is-medium">
                    <span class="mdi mdi-account-group"></span>
                </span>
                <span>
                    @{{$t('groups')}}
                </span>
            </router-link>
        </div>
    </aside>
</div>
