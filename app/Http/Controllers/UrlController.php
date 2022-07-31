<?php

namespace App\Http\Controllers;

use App\Models\Url;
use App\Http\Requests\StoreUrlRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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
  public function store(Request $request)
  {
    try {

      $data = $request->all();
      $validator = Validator::make($request->all(), [
           'link' => 'required|url',
       ],[
      'link.required' => 'The url field is required.',
      'link.url' => 'The url is not valid. Url must start with https:// or http:// protocol.',
    ]);
        
       if ($validator->fails()) {
            return response()->json(['error'=>$validator->messages()->first()],200);
       }
      $user = Auth::user();
      $url = new Url();
      if($request->user_shortcode) {
        if(Url::where('shortcode',$request->user_shortcode)->count()) {
          return response()->json(['error'=>'Shortcode already exists.'],200);
        }
        $url->shortcode = $request->user_shortcode;
      } else {
        $url->shortcode = \Str::random(6);
      }
      $url->user_id=$user->id;
      $url->link=$request->link;
      $url->clicks=0;
      $url->save();

      return response()->json($url, 200);
    } catch (\Exception $e) {
        return response()->json(['error'=>$e->getMessage()], 200);
     
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
