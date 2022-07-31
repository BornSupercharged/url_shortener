<?php

namespace App\Http\Controllers;

use App\Models\Url;
use App\Http\Requests\StoreUrlRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class UrlController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $user = Auth::user();
    $urls = Url::where('user_id', $user->id)->orderBy('id','DESC')->get();
    return response()->json($urls ?? []);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \App\Http\Requests\StoreSubjectRequest  $request
   * @return \Illuminate\Http\Response
   */
  public function store(StoreUrlRequest $request)
  {
    try {

      $data = $request->all();
      $user = Auth::user();
      $url = new Url();
      $url->shortcode = \Str::random(2).time().$user->id;
      $url->user_id=$user->id;
      $url->link=$request->link;
      $url->clicks=0;
      $url->save();

      return response()->json($url, 200);
    } catch (\Exception $e) {
      return throw ValidationException::withMessages([
        'error' => $e->getMessage()
      ]);
    }
  }
  public function destroy(Request $request) {
    $data = $request->validate([
      'id' => 'required'
    ]);
    $user = Auth::user();
    $url =Url::where('id',$request->id)->where('user_id',$user->id)->delete();
    return response()->json('success', 200);
  }
}
