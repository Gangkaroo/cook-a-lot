<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    /**
     * The attributes that are mass assignable
     * @var string[]
     */
    protected $fillable = [
        'title', 'description'
    ];

    protected $casts = [
        'updated_at' => 'datetime'
    ];

    /**
     * Every recipe was created by a user
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Recipes require ingredients
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function ingredients()
    {
        return $this->hasMany(Ingredient::class);
    }

    /**
     * The tags that are associated to the recipe
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'recipe_has_tags');
    }
}
