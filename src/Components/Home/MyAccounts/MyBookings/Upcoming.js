import React, { useEffect, useState } from "react";
import booking_bus from "../../../../assets/booking_bus.png";
import { FaArrowRightLong } from "react-icons/fa6";
import dayjs from "dayjs";
import { IoPersonOutline } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import empty from "../../../../assets/empty.png";
import { GetBookingStatusDetails } from "../../../../Api/MyAccounts/MyBookings";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "antd";
import DrawerDetails from "../../../Dashboard/Drawer";
import TicketView from "./TicketView";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

export default function Upcoming() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [spinning, setSpinning] = useState(false);

  // const UpcomingDetails = [
  //   {
  //     depature: "Chennai",
  //     arraival: "Coimbatore",
  //     status: "Completed",
  //     trip_type: "One Way Bus",
  //     booking_id: "NU123456789101234",
  //     depature_date: new Date(),
  //     arraival_date: new Date(),
  //     depature_time: "11:30 PM",
  //     arraival_time: "05:30 AM",
  //     passenger_name: ["Mithun Kumar"],
  //   },
  //   {
  //     depature: "Chennai",
  //     arraival: "Coimbatore",
  //     status: "Completed",
  //     trip_type: "One Way Bus",
  //     booking_id: "NU123456789101234",
  //     depature_date: new Date(),
  //     arraival_date: new Date(),
  //     depature_time: "11:30 PM",
  //     arraival_time: "05:30 AM",
  //     passenger_name: ["Mithun Kumar", "Subash"],
  //   },
  //   {
  //     depature: "Chennai",
  //     arraival: "Coimbatore",
  //     status: "Completed",
  //     trip_type: "One Way Bus",
  //     booking_id: "NU123456789101234",
  //     depature_date: new Date(),
  //     arraival_date: new Date(),
  //     depature_time: "11:30 PM",
  //     arraival_time: "05:30 AM",
  //     passenger_name: ["Mithun Kumar", "Subash", "Manoj"],
  //   },
  // ];
  const UpcomingDetailss = useSelector((state) => state.booking_details_status);
  console.log(UpcomingDetailss, "ithuulla");

  // const ticketdetails = useSelector((state)=>state.ticket_details)
  // console.log(ticketdetails,"ticketdetailsin the isdfkdsnf");

  const dispatch = useDispatch();
  const statusid = `upcoming`;
  const Number = sessionStorage.getItem("user_mobile");
  useEffect(() => {
    setSpinning(true);
    GetBookingStatusDetails(statusid, Number, dispatch, setSpinning);
  }, []);
  // useEffect(() => {
  //   if (UpcomingDetailss.map((item) => item.passenger_name.length > 3)) {
  //     const passengerlist = UpcomingDetailss.map((item) => {
  //       return item.passenger_name.slice(3);
  //     });
  //     console.log(passengerlist, "passengerlist");
  //   }
  // }, [UpcomingDetailss]);
  const [passCount, setPassCount] = useState(false);

  useEffect(() => {
    UpcomingDetailss?.forEach((booking, index) => {
      const passengerCount = booking.passenger.length;
      if (passengerCount > 3) {
        setPassCount(true);
      }
      console.log(
        `Booking ID: ${booking.Booking_Id}, Passenger Count: ${passengerCount}`
      );
    });
  }, [UpcomingDetailss]);

  return (
    <>
      {spinning ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <Spin
            className="pl-[20vw]"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            spinning={spinning}
            indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
          />
        </div>
      ) : (
        <div className="">
          {UpcomingDetailss?.length > 0 ? (
            <div className="h-[35vw]  overflow-y-scroll ">
              {UpcomingDetailss?.map((item) => (
                <div className="grid grid-rows-12 w-full  max-h-[22vw] bg-white mt-[1vw] border-[0.1vw] border-gray-400 relative">
                  {/* <div className="absolute left-[-1.5vw] top-[1.6vw] ">
                <div className="bg-white w-[2.5vw] h-[2.5vw] border-[0.2vw] rounded-full z-[1] border-[#8EA3BD] flex items-center justify-center">
                  <img src={booking_bus} className="w-[1.7vw] h-[1.7vw]" />
                </div>
              </div> */}
                  <div className="row-span-5 w-full border-b-[0.1vw]  border-gray-400 ">
                    <div className="grid grid-cols-4 w-full h-full flex-col items-center ">
                      <div className="col-span-3 flex flex-col gap-y-[0.5vw] pl-[4vw]">
                        <div className="flex items-center">
                          <label className="text-[1.1vw] text-[#1F487C] font-bold">
                            {item.departure_name}
                          </label>
                          <span className="px-[0.5vw]">
                            <FaArrowRightLong color="#1F487C" />
                          </span>
                          <label className="text-[1.1vw] text-[#1F487C] font-bold">
                            {item.arrival_name}
                          </label>
                        </div>
                        <div className="flex items-center gap-x-[0.5vw]">
                          <label className="text-[1.1vw] text-[#1F487C]">
                            {item.status}
                          </label>
                          {/* <div className="h-[0.5vw] w-[0.5vw] bg-[#1F487C] rounded-full"></div> */}
                          <label className="text-[1.1vw] text-[#1F487C] font-bold">
                            {/* {item.trip_type} */}
                          </label>
                          <div className="h-[0.5vw] w-[0.5vw] bg-[#1F487C] rounded-full"></div>
                          <label className="text-[1.1vw] text-[#1F487C] ">
                            {`Booking ID - ${item.Booking_Id}`}
                          </label>
                        </div>
                      </div>
                      <div className="col-span-1 flex items-center justify-center">
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setTicketDetails(item);
                          }}
                          className="bg-[#1F487C] text-[1.1vw] font-bold rounded-full text-white w-[15vw] h-[3vw]"
                        >
                          VIEW BOOKING
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className=" row-span-7 w-full pl-[4vw] h-full pt-[1vw] pb-[1vw] ">
                    <div className="items-center  h-full grid grid-cols-6 pr-[vw]">
                      <div className="flex justify-between col-span-4 pr-[5vw]">
                        <div className="flex flex-col gap-y-[0.5vw]">
                          <label className="text-[1.1vw] text-[#1F487C] ">
                            From
                          </label>
                          <label className="flex items-center gap-[0.5vw]">
                            <span className="text-[1.1vw] text-[#1F487C] font-bold">
                              {dayjs(item.departure_date).format("DD MMM' YY")}
                            </span>
                            <span className="text-[1.1vw] text-[#1F487C] ">
                              {item.departure_time}
                            </span>
                          </label>
                          <label className="text-[1.1vw] text-[#1F487C] font-bold ">
                            {item.departure_name}
                          </label>
                        </div>
                        <div className="flex flex-col gap-y-[0.5vw]">
                          <label className="text-[1.1vw] text-[#1F487C] ">
                            To
                          </label>
                          <label className="flex items-center gap-[0.5vw]">
                            <span className="text-[1.1vw] text-[#1F487C] font-bold">
                              {dayjs(item.arrival_date).format("DD MMM' YY")}
                            </span>
                            <span className="text-[1.1vw] text-[#1F487C] ">
                              {item.arrival_time}
                            </span>
                          </label>
                          <label className="text-[1.1vw] text-[#1F487C] font-bold ">
                            {item.arrival_name}
                          </label>
                        </div>
                      </div>
                      {/* <div 
      className={`flex flex-col gap-y-[0.5vw] ${passCount ? 'grid grid-cols-2 gap-x-[.5vw]' : ''}`}
    >
                    {item.passenger.map((list) => (
                      
                      <label className="flex items-center gap-x-[0.5vw]">
                        
                        <span>
                          <IoPersonOutline size={"1.2vw"} color={"#1F487C"} />
                        </span>
                        <span className="text-[1.1vw] text-[#1F487C] font-bold ">
                          {list.user_name}
                        </span>
                      </label>
                    ))}
                  </div> */}
                      <div className="col-span-2 ">
                        <div className="flex justify-center">
                          <div
                            className={` ${
                              item?.passenger?.length > 3
                                ? "grid grid-cols-2 gap-x-[1.5vw] gap-y-[.5vw]"
                                : "flex flex-col gap-y-[0.5vw]"
                            }`}
                          >
                            {item?.passenger?.map((list) => (
                              <Popover
                                key={list.user_name}
                                content={list.user_name}
                                trigger="hover"
                              >
                                <label className="flex items-center gap-x-[0.5vw]">
                                  <span>
                                    <IoPersonOutline
                                      size={"1.2vw"}
                                      color={"#1F487C"}
                                    />
                                  </span>
                                  <span className="text-[1.1vw] text-[#1F487C] font-bold">
                                    {list?.user_name?.length > 8
                                      ? `${list.user_name.slice(0, 8)}...`
                                      : list.user_name}
                                    {/* {(list.user_name)} */}
                                  </span>
                                </label>
                              </Popover>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex flex-col gap-y-[0.5vw]">
                    <label
                      // onClick={() => {
                      //   setShowModal(true);
                      //   setTicketDetails(item);
                      // }}
                      className="flex items-center gap-x-[0.5vw]"
                    >
                      <span>
                        <LuDownload size={"1.2vw"} color={"#1F487C"} />
                      </span>
                      <span className="text-[1.1vw] text-[#1F487C] font-bold ">
                        Preview Invoice
                      </span>
                    </label>
                  </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-x-[3vw] items-center pt-[3vw] justify-center">
              <img src={empty} className="w-[12vw] h-[13vw]" />
              <div className="flex flex-col gap-y-[0.5vw]">
                <label className="text-[2vw] text-[#1F487C] font-bold ">
                  Looks empty, you’ve no Upcoming bookings
                </label>
                <label className="flex text-[1.2vw] text-[#1F487C] items-center gap-[0.5vw]">
                  Looks like you don’t have any Upcoming trips
                </label>
                <button className="bg-[#1F487C] mt-[1vw] w-[12vw] text-white font-bold text-[1.2vw] h-[3vw] rounded-full">
                  Plan a Trip
                </button>
              </div>
            </div>
          )}

          {/* {showInvoice?<DrawerDetails showInvoice={showInvoice}/>:""} */}
          <TicketView
            showModal={showModal}
            setShowModal={setShowModal}
            ticketDetails={ticketDetails}
          />
        </div>
      )}
    </>
  );
}