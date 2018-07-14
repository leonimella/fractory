<?php

namespace App\Http\Controllers\API;

use App\Order;
use App\Service\OrderService;
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
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $orders = Order::latest()->get()->all();
        $headers = [
            'name' => 'Name',
            'qty' => 'QTY',
            'thickness' => 'Thickness',
            'material' => 'Material',
            'bending' => 'Bending',
            'threading' => 'Threading'
        ];

        array_unshift($orders, $headers);

        return response()->json([
            'data' => [
                'orders' => $orders
            ],
            'links' => [
                'self' => $request->fullUrl(),
            ],
        ], 200);
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
        $ordersWithErrors = $this->orderService->createOrders($orders);

        if (empty($ordersWithErrors)) {
            return response()->json([
                'data' => [
                    'message' => 'Orders created successfully!',
                    'status' => 'success'
                ],
                'links' => [
                    'self' => $request->fullUrl(),
                ],
            ], 201);
        }

        return response()->json([
            'error' => [
                'message' => 'Some of these orders may be with wrong data, please correct than and send again',
                'status' => 'danger',
                'orders' => $ordersWithErrors
            ],
            'links' => [
                'self' => $request->fullUrl(),
            ],
        ], 400);
    }
}
