<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecipeSource extends Model
{
    /**
     * Several recipes may have the same source
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function recipes() {
        return $this->belongsToMany(Recipe::class);
    }
}
