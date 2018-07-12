<?php

namespace App\Http\Controllers\API;

use App\Order;
use App\Service\OrderService;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrdersController extends Controller
{
    private $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $orders = $request->get('orders');
        $newOrder = new Order;

        try {
            foreach ($orders as $order) {
                $newOrder->fill($order);
                $newOrder->save();
            }
        } catch (QueryException $e) {
            $this->orderService->getNotNullableColumn($e);
        }

        return response()->json($request->all(), 201);
    }
}
