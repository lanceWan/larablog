@inject('presenter', 'App\Presenters\Front\IndexPresenter')
<header class="header-transparent header-transparent-bb navbar-fixed-top header-sticky">
    <nav class="navbar mega-menu" role="navigation">
        <div class="container">
            <div class="menu-container">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="toggle-icon"></span>
                </button>

                <div class="navbar-actions">

                    <div class="navbar-actions-shrink search-fullscreen search-fullscreen-trigger-white">
                        <div class="search-fullscreen-trigger">
                            <i class="search-fullscreen-trigger-icon fa fa-search"></i>
                        </div>
                        <div class="search-fullscreen-overlay">
                            <div class="search-fullscreen-overlay-content">
                                <div class="search-fullscreen-input-group">
                                    <input type="text" class="form-control search-fullscreen-input" placeholder="Search for ...">
                                    <button class="search-fullscreen-search" type="button"><i class="search-fullscreen-search-icon fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="search-fullscreen-bg-overlay">
                            <div class="search-fullscreen-close">×</div>
                        </div>
                    </div>
                </div>

                <div class="navbar-logo">
                    <a class="navbar-logo-wrap" href="index.html">
                        <img class="navbar-logo-img navbar-logo-img-white" src="{{asset('image/logo-white.png')}}" alt="Ark">
                        <img class="navbar-logo-img navbar-logo-img-dark" src="{{asset('image/logo-dark.png')}}" alt="Ark">
                    </a>
                </div>
            </div>

            <div class="collapse navbar-collapse nav-collapse">
                <div class="menu-container">
                    <ul class="nav navbar-nav">
                        {!! $presenter->categoriesList($categories) !!}
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</header>