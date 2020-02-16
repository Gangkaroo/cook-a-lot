<!doctype html>
<html lang="{{locale()->current()}}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="/images/Vegetarian.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/css/app.css">

    <title>Cook-a-lot</title>
</head>
<body>
<div id="app">
    @include('layouts.header')

    <div class="section">
        <div class="columns">
            <div class="column is-narrow" v-if="$auth.check()">
                @include('layouts.menu')
            </div>
            <div class="column">
                <div class="container">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>

    @include('layouts.footer')
</div>

<script src="/js/app.js"></script>
</body>
</html>
