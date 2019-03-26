<?php

namespace App\Providers;

use App\Locale;
use Illuminate\Support\ServiceProvider;

class LocaleServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register translation service.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Locale::class, function ($app) {
            return new Locale($app);
        });
    }
}
