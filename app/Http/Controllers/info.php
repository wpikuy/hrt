<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\msg;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
use Symfony\Component\VarDumper\VarDumper;
use Maatwebsite\Excel\Facades\Excel;

class info extends Controller {

	public function getAllInfoes(){
		return response()->json($this->makeJson(msg::all()));
	}
	
	/*
	public function getInfo(){
		$v = Validator::make(Input::all(),[
					'uid' => 'reauired|numeric'
			]);
		if($v->fails()){
			return response('bad request', 400);
		}
		
		$
	}
	*/
	
	public function saveInfo(){
		$v = Validator::make(Input::all(),[
					'uid' => 'required|numeric',
					'na' => 'required',
					'rp' => 'required',
					'op' => 'required',
					'mp' => 'required',
					'ma' => 'required'
			]);
		if($v->fails()){
			return response('bad request', 400);
		}
		
		$info = msg::findOrNew(Input::get('uid'));
		$info->na = Input::get('na');
		$info->rp = Input::get('rp');
		$info->op = Input::get('op');
		$info->mp = Input::get('mp');
		$info->ma = Input::get('ma');
		
		$info->save();
		
		return response()->json($this->makeJson([$info]));
	}
	
	public function deleteInfo(){
		$v = Validator::make(Input::all(),[
					'uid' => 'required|numeric'
			]);
		if($v->fails() || msg::find(Input::get('uid')) == null){
			return response('bad request', 400);
		}
		
		msg::find(Input::get('uid'))->delete();
		return response()->json(['good']);
	}
	
	public function searchInfo(){
		$v = Validator::make(Input::all(),[
					'word' => 'required',
					'type' => 'required'
			]);
		if($v->fails()){
			return response('bad request', 400);
		}
		
		$query = 'select * from staff where '.Input::get('type').' like "%'.Input::get('word').'%"';
		$results = $this->makeJson(DB::select($query));
		return response()->json($results);
	}
	
	public function uploadInfo(){
		try {
			\Illuminate\Support\Facades\Request::file('excel')->move(storage_path('excel'), 'excel.xlsx');
			Excel::load('storage\excel\excel.xlsx', function ($reader){
				foreach ($reader->all()->toArray() as $set){
					$msg = new msg();
					$msg->na = $set['name'];
					$msg->rp = $set['resident_phone'];
					$msg->op = $set['office_phone'];
					$msg->mp = $set['mobile_phone'];
					$msg->ma = $set['mail_address'];
					$msg->save();
				}
			});
		}
		catch (Exception $e){
			
		}
		finally{
			return redirect('viewall');
		}
	}
	
	protected function makeJson($msgs){
		$result = [];
		foreach ($msgs as $ms){
			$result[] = [
					'uid' => $ms->id,
					'na' => $ms->na,
					'rp' => $ms->rp,
					'op' => $ms->op,
					'mp' => $ms->mp,
					'ma' => $ms->ma
			];
		}
		return $result;
	}

}
