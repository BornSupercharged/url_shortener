<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Url;
use App\Models\User;

class SpaController extends Controller
{
    /**
     * Get the SPA view.
     */
    public function __invoke()
    {
        return view('spa');
    }

    public function index($code) {
    	$url=Url::where('shortcode',$code)->firstOrFail();
    	$url->clicks=$url->clicks+1;
    	$url->last_access_timestamp=date('Y-m-d H:i:s');
    	$url->save();
    	return redirect()->to($url->link);
    }
    public function stats($code) {
    	$url=Url::where('shortcode',$code)->firstOrFail();
    	return response()->json(['clicks'=>$url->clicks,'Last Access At'=>($url->last_access_timestamp)?date('Y-m-d H:i:s',strtotime($url->last_access_timestamp)):'','Created At'=>date('Y-m-d H:i:s',strtotime($url->created_at)),'Updated At'=>date('Y-m-d H:i:s',strtotime($url->updated_at))], 200);
    }
    public function user_stats($id) {
    	$user=User::where('id',$id)->firstOrFail();
    	$result=Url::where('user_id',$id)->get();
    	$urls=array();
    	foreach ($result as $key => $value) {
    		array_push($urls, ['shortcode'=>$value->shortcode,'clicks'=>$value->clicks,'last_access_timestamp'=>($value->last_access_timestamp)?date('Y-m-d H:i:s',strtotime($value->last_access_timestamp)):'','created_at'=>date('Y-m-d H:i:s',strtotime($value->created_at))]);
    	}
    	return response()->json($urls, 200);
    }
}
