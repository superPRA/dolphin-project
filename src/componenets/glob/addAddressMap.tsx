import React from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import {
  addLocation,
  setAddressMapStatus,
  setEditMode,
} from "../../redux/app/features/inputs/inputSlice";
import { LatLngExpression } from "leaflet";
import { useFormik } from "formik";
import Icons from "./Icons";

const defaultCenter: LatLngExpression = [34.613419, 50.843572];

interface initVal {
  city: string;
  fullAddress: string;
  addressTitle: string;
  homeNumber: string;
}

const MarkerComponent = ({
  findLocation,
  setLatlng,
}: {
  findLocation: number;
  setLatlng: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const [center, setCenter] = useState(defaultCenter);

  const map = useMapEvents({
    locationfound: (e) => {
      setCenter([e.latlng.lat, e.latlng.lng]);
      map.flyTo([e.latlng.lat, e.latlng.lng], map.getZoom());
    },
    drag: () => {
      setCenter([map.getCenter().lat, map.getCenter().lng]);
    },
  });
  useEffect(() => {
    if (findLocation > 0) {
      map.locate();
    }
  }, [findLocation]);
  useEffect(() => {
    const { lat, lng } = map.getCenter();
    setLatlng([lat, lng]);
  }, []);
  return <Marker position={center}></Marker>;
};

export default function AddAddressMap() {
  const isEdit = useAppSelector((state) => state.inp.addressMapEdit);
  const user = useAppSelector((state) => state.inp.users).find(
    (item) => item.isActive === true
  );
  const initialValues: initVal = {
    addressTitle: isEdit ? "" : "",
    fullAddress: "",
    homeNumber: "",
    city: "",
  };
  const [addressInfo, setAddressInfo] = useState(false);
  const [findLocation, setFindLocation] = useState(0);
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const [Latlng, setLatlng] = useState([0, 0]);
  const [css, setCss] = useState("md:scale-150 md:opacity-0 hidden");
  const status = useAppSelector((city) => city.inp.addAddressMappStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status) {
      setCss("md:scale-150 md:opacity-30 block");
      setTimeout(() => {
        setCss("md:scale-100 md:opacity-100 block");
      }, 10);
    } else {
      setCss("md:scale-50 md:opacity-0 block");
      setTimeout(() => {
        setCss("md:scale-150 md:opacity-0 hidden");
      }, 300);
      dispatch(setEditMode(false));
    }
  }, [status]);
  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const erorrs: initVal = {
        addressTitle: "",
        fullAddress: "",
        homeNumber: "",
        city: "",
      };
      if (!values.city) {
        erorrs.city = "لطفا ادرس را وارد کنید";
      } else if (values.city.match(/[0-9]/i)) {
        erorrs.city = "ادرس را درست وارد کنید";
      }

      if (!values.fullAddress) {
        erorrs.fullAddress = "لطفا ادرس را کامل وارد کنید";
      }

      if (!values.addressTitle) {
        erorrs.addressTitle = "عنوان ادرس را وارد کنید";
      }

      if (!values.homeNumber) {
        erorrs.homeNumber = "تلفن ثابت را وارد کنید";
      } else if (values.homeNumber.match(/[^0-9]/i)) {
        erorrs.homeNumber = "شماره تلفن را درست وارد کنید";
      }
      console.log(erorrs);
      return erorrs;
    },
    onSubmit: () => {},
  });
  function submit() {
    const { addressTitle, city, fullAddress, homeNumber } = formik.values;
    dispatch(
      addLocation({
        address: fullAddress,
        addressTitle: addressTitle,
        city: city,
        homeNumber: homeNumber,
        lat: Latlng[0],
        lng: Latlng[1],
      })
    );
    formik.values.city = "";
    formik.values.addressTitle = "";
    formik.values.fullAddress = "";
    formik.values.homeNumber = "";
    dispatch(setAddressMapStatus(false));
    setAddressInfo(false);
  }
  return (
    <div
      className={`bg-white ${css} transition-all z-50 duration-300 h-[30rem] w-[45rem] fixed left-[calc(50%-22.5rem)] top-[calc(50%-18rem)] `}
    >
      {!addressInfo && (
        <div className="h-full ">
          <header className="flex justify-between items-center px-4 text-xl font-bold bg-white py-3">
            <div className="text-white">.</div>
            <h1>ادرس</h1>
            <button onClick={() => dispatch(setAddressMapStatus(false))}>
              <Icons name="close" />
            </button>
          </header>
          <div className="h-full w-full border relative">
            <MapContainer
              id="map"
              className="h-full w-full"
              center={defaultCenter}
              zoom={16}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerComponent
                findLocation={findLocation}
                setLatlng={setLatlng}
              />
            </MapContainer>
          </div>
          <div className="bg-white py-3 flex justify-between items-center px-4">
            <button
              className="px-5 py-2 bg-red-600 text-white rounded"
              onClick={() => setFindLocation((oldValue) => oldValue + 1)}
            >
              موقغیت منو پیدا کن
            </button>
            <button
              className="px-5 py-2 bg-red-600 text-white rounded"
              onClick={() => setAddressInfo(true)}
            >
              ثبت موقعیت
            </button>
          </div>
        </div>
      )}
      {addressInfo && (
        <div>
          <header className="flex justify-between items-center text-xl p-4">
            <button onClick={() => setAddressInfo(false)}>
              <Icons name="rightAngle" />
            </button>
            <h1>ادرس</h1>
            <button
              onClick={() => {
                dispatch(setAddressMapStatus(false));
                setAddressInfo(false);
              }}
            >
              <Icons name="close" />
            </button>
          </header>
          <form onSubmit={formik.handleSubmit}>
            <div className="relative mx-20 mt-6">
              <input
                className={`outline-none w-full border-b peer p-1 ${
                  submitAttempt && formik.errors.city ? "border-b-red-600" : ""
                } `}
                id="city"
                type="text"
                {...formik.getFieldProps("city")}
              />
              <label
                htmlFor="city"
                className={`absolute  font-semibold transition-all peer-focus:-top-7 peer-focus:text-black peer-focus:text-sm right-1 ${
                  formik.values.city ? "-top-6 text-base" : "top-0 text-lg"
                } ${
                  submitAttempt && formik.errors.city
                    ? "text-red-600"
                    : "text-gray-400"
                }`}
              >
                استان
              </label>
              <div className="h-3 w-full text-red-600">
                {!!submitAttempt && formik.errors.city}
              </div>
            </div>
            <div className="mx-20 mt-10 relative">
              <textarea
                id="address"
                className={`border-b peer outline-none w-full p-1 min-h-[5rem] ${
                  submitAttempt && formik.errors.fullAddress
                    ? "border-b-red-600"
                    : ""
                }`}
                {...formik.getFieldProps("fullAddress")}
              />
              <label
                htmlFor="address"
                className={`absolute right-0 peer-focus:-top-8 transition-all peer-focus:text-black peer-focus:text-sm ${
                  formik.values.fullAddress
                    ? "-top-6 text-base"
                    : "top-0 text-lg"
                } ${
                  submitAttempt && formik.errors.fullAddress
                    ? "text-red-600"
                    : "text-gray-400"
                }`}
              >
                ادرس دقیق
              </label>
              <div className="h-3 w-full text-red-600">
                {!!submitAttempt && formik.errors.fullAddress}
              </div>
            </div>
            <div className="flex items-center mx-20 mt-12">
              <div className="w-full relative">
                <input
                  id="addressTitle"
                  className={`border-b outline-none peer ${
                    submitAttempt && formik.errors.addressTitle
                      ? "border-b-red-600"
                      : ""
                  } `}
                  {...formik.getFieldProps("addressTitle")}
                />
                <label
                  htmlFor="addressTitle"
                  className={`absolute font-semibold transition-all peer-focus:-top-7 peer-focus:text-black peer-focus:text-sm right-1 ${
                    formik.values.addressTitle
                      ? "-top-6 text-base"
                      : "-top-2 text-lg"
                  } ${
                    submitAttempt && formik.errors.addressTitle
                      ? "text-red-600"
                      : "text-gray-400"
                  }`}
                >
                  عنوان ادرس
                </label>
                <div className="h-3 w-full text-red-600">
                  {!!submitAttempt && formik.errors.addressTitle}
                </div>
              </div>
              <div className="w-full relative">
                <input
                  id="homeNumber"
                  className={`border-b outline-none peer ${
                    submitAttempt && formik.errors.homeNumber
                      ? "border-b-red-600"
                      : ""
                  }`}
                  {...formik.getFieldProps("homeNumber")}
                />
                <label
                  htmlFor="homeNumber"
                  className={`absolute font-semibold transition-all peer-focus:-top-7 peer-focus:text-black peer-focus:text-sm right-1 ${
                    formik.values.homeNumber
                      ? "-top-6 text-base"
                      : "-top-2 text-lg"
                  } ${
                    submitAttempt && formik.errors.homeNumber
                      ? "text-red-600"
                      : "text-gray-400"
                  }`}
                >
                  تلفن ثابت
                </label>
                <div className="h-3 w-full text-red-600">
                  {!!submitAttempt && formik.errors.homeNumber}
                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={(e) => {
                setSubmitAttempt(true);
                submit();
              }}
              className="py-3 px-12 bg-red-600 rounded text-white mt-12 mx-auto block"
            >
              ذخیره
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
