<?php

namespace Database\Seeders;

use App\Models\SubjectUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectUserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    SubjectUser::factory()->count(10)->create();
  }
}
