<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Recipe;
use Faker\Generator as Faker;

$factory->define(Recipe::class, function (Faker $faker) {
    return [
        'user_id' => factory(\App\User::class),
        'title' => $faker->sentence,
        'description' => "<p>" . $faker->paragraph . "</p>",
        'prep_time' => $faker->time(),
        'cook_time' => $faker->time(),
        'rating' => $faker->numberBetween(1, 5)
    ];
});
