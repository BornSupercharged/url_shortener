<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Url;

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
}
