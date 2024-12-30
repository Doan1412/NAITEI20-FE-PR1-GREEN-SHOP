import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { Order } from "../../types/order.type";
import http from "../../utils/http";
import { Product } from "../../types/product.type";
import { Breadcrumb, Dropdown, MenuProps } from "antd";
import { Link } from "react-router-dom";
import StatisticsCard from "../../components/statisticsCard";

interface ISeriesData {
  name: string;
  data: number[];
}

interface IData {
  noData?: {
    text?: string;
    align?: string;
    verticalAlign?: string;
    offsetX?: number;
    offsetY?: number;
    style?: {
      color?: string;
      fontSize?: string;
      fontFamily?: string;
    };
  };
  options: object;
  series: ISeriesData[];
}
interface IPieData {
  series?: number[];
  options: object;
  data?: number[];
}

interface IProductData {
  name: string;
  quantity: number;
}

const Dashboard = () => {
  const [data, setData] = useState<IData>({ options: {}, series: [] });
  const [barData, setBarData] = useState<IData>({ options: {}, series: [] });
  const [pieData, setPieData] = useState<IPieData>({ options: {}, series: [], data: [] });
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(12);
  const [ratingData, setRatingData] = useState<IData>({ options: {}, series: [] });

  const fetchOrders = async () => {
    const response = await axios.get("http://localhost:3000/orders");
    const orders = response.data;
    setOrders(orders);

    const productQuantities: Record<string, IProductData> = orders.reduce((acc: Record<string, IProductData>, order: Order) => {
      order.products.forEach((product) => {
        if (!acc[product.id]) {
          acc[product.id] = { name: product.name, quantity: 0 };
        }
        acc[product.id].quantity += product.quantity;
      });
      return acc;
    }, {} as Record<string, IProductData>);

    const categories = Object.values(productQuantities).map((p) => p.name);
    const data = Object.values(productQuantities).map((p) => p.quantity);
  
    const chartOptions = {
      chart: {
        id: "product-bar-chart",
      },
      xaxis: {
        categories,
      },
    };
  
    const chartSeries = [
      {
        name: "Số lượng bán",
        data,
      },
    ];

    setBarData({
      options: {
        ...chartOptions,
        title: {
          text: 'Top sản phẩm bán chạy',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
      },
      series: chartSeries
    })
    getLineChart(orders);
  };

  const fetchProduct = async () => {
    try {
      const res = await http.get('/products');
      const products = res.data;
      const categoryCount: { [key: string]: number } = {};

      products.forEach((product: Product) => {
        const categoryName: string = product.category.lv0 ?? '';
        categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
      });
    
      const totalProducts = products.length;
    
      const categoryPercentages = Object.keys(categoryCount).map((categoryName) => {
        const count = categoryCount[categoryName];
        const percentage = (count / totalProducts) * 100;
    
        return {
          category: categoryName,
          percentage: percentage.toFixed(2),
          data: count,
        };
      });

      const labels = categoryPercentages.map(item => item.category);
      const dataPercent = categoryPercentages.map(item => parseFloat(item.percentage));
      const data = categoryPercentages.map(item => item.data);
      const chartData = {
        series: dataPercent,
        data,
        options: {
          chart: {
            type: 'pie',
          },
          title: {
            text: 'Tỷ lệ sản phẩm của hệ thống',
            align: 'left'
          },
          labels,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: '100%',
                },
              },
            },
          ],
        }
      };
      setPieData(chartData);

      const topRatedProducts = [...products]
      .map((product: Product) => ({
        name: product.name,
        reviews: product.comments.length,
      }))
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, 5);

      const ratingLabels = topRatedProducts.map((product) => product.name);
      const ratingData = topRatedProducts.map((product) => product.reviews);

      const ratingChartData = {
        series: [
          {
            name: 'Đánh giá',
            data: ratingData,
          },
        ],
        options: {
          chart: {
            type: 'bar',
          },
          title: {
            text: 'Top 5 sản phẩm được đánh giá nhiều nhất',
            align: 'left',
          },
          xaxis: {
            categories: ratingLabels,
            title: {
              text: 'Tên sản phẩm',
            },
          },
          yaxis: {
            title: {
              text: 'Số lượt đánh giá',
            },
          },
        },
      };

      setRatingData(ratingChartData);
    } catch (error) { 
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrders();
    fetchProduct();
  }, []);

  useEffect(() => {
    getLineChart();
  }, [selectedMonth]);

  const getLineChart = (data?: Order[]) => {
    const filteredOrders = (data ?? orders).filter((order: Order) => {
      const orderDate = new Date(order.date);
      return (
        orderDate.getMonth() === (selectedMonth - 1)
      );
    });

    const revenueByDate = filteredOrders.reduce((acc: Record<string, number>, order: Order) => {
      const date = new Date(order.date).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + order.total;
      return acc;
    }, {});
  
    const categoriesLine = Object.keys(revenueByDate);
    const seriesData: number[] = Object.values(revenueByDate) ?? [];
    setData({
      noData: {
        text: "No data text",
        align: "center",
        verticalAlign: "middle",
      },
      options: {
        chart: {
          id: "revenue-chart",
          toolbar: {
            show: true,
            tools: {
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: true,
              customIcons: []
            }
          }
        },
        xaxis: {
          categories: categoriesLine,
        },
        title: {
          text: "Doanh thu theo ngày trong tháng",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
      },
      series: [
        {
          name: "Revenue",
          data: seriesData,
        },
      ],
    });
  }

  const months = [
    { label: 'Tháng 1', key: '1' },
    { label: 'Tháng 2', key: '2' },
    { label: 'Tháng 3', key: '3' },
    { label: 'Tháng 4', key: '4' },
    { label: 'Tháng 5', key: '5' },
    { label: 'Tháng 6', key: '6' },
    { label: 'Tháng 7', key: '7' },
    { label: 'Tháng 8', key: '8' },
    { label: 'Tháng 9', key: '9' },
    { label: 'Tháng 10', key: '10' },
    { label: 'Tháng 11', key: '11' },
    { label: 'Tháng 12', key: '12' },
  ];
  
  const items: MenuProps['items'] = months.map((month) => ({
    label: month.label,
    key: month.key,
  }));
  const handleMenuClick: MenuProps['onClick'] = (info) => {
    const selected = months.find((month) => month.key === info.key)?.key;
    if (selected) {
      setSelectedMonth(Number(selected));
    }
  };

  return (
    <div className="container max-w-[1100px] flex flex-col gap-8 mx-auto mb-40">
      <div>
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            }
          ]}
        />
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-green-600 mb-3 uppercase">Thống kê hệ thống</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          pieData.series && pieData.series.length > 0 &&
          pieData.series.map((item, index) => 
            <StatisticsCard key={index} title={pieData.options?.labels?.[index]} data={pieData.data?.[index] ?? 0} percent={item}/>
          )
        }
      </div>
      <div className="flex gap-6">
        <div className="relative w-[calc(50%-40px)]">
        <Dropdown className="absolute z-10 right-[21%] top-[6%] border py-1 px-2.5 rounded-lg" arrow menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            Tháng {selectedMonth}
          </a>
        </Dropdown>
          <Chart
            options={data.options}
            series={data.series}
            type="line"
            width={'100%'}
            height="300"  
            className="border rounded p-6 shadow-current w-full"
          />
        </div>
        
        <Chart
          options={barData.options}
          series={barData.series}
          type="bar" 
          width={'100%'}  
          height="300"
          className="border rounded p-6 shadow-current w-[calc(50%-40px)]"
        />
      </div>
      <div className="w-full flex gap-6">
        <Chart
          options={ratingData.options}
          series={ratingData.series}
          type="bar" 
          width={'100%'}  
          height="300"
          className="border rounded p-6 shadow-current w-[calc(50%-40px)]"
        />
        <Chart
          options={pieData.options}
          series={pieData.series}
          type="donut"
          width="400"
          className="border rounded p-6 shadow-current w-[calc(50%-40px)]"
        />
      </div>
    </div>
  );
};

export default Dashboard;
