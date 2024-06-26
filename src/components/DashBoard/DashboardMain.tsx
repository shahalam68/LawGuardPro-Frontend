import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import EmptyCase from "../Case/EmptyCase";
import CaseUpdate from "../Case/CaseUpadate"; // Correct import
import { useSession } from "next-auth/react";
import Link from "next/link";

type CaseData = {
  totalCount: number;
  data: any[]; // Replace 'any' with the actual type of case data if available
};

const DashboardMain: React.FC = () => {
  const [showCaseUpdate, setShowCaseUpdate] = useState(false);
  const session = useSession();
  let fullName =
    session?.data?.user?.firstName + " " + session?.data?.user?.lastName;
  console.log(fullName);
  const [caseData, setCaseData] = useState<CaseData>({
    totalCount: 0,
    data: [],
  });
  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://54.203.205.46:5140/api/case/list?pageNumber=${page}&pageSize=${perPage}`,
          {
            headers: {
              Authorization: `Bearer ${session?.data?.accessToken}`,
            },
          }
        );
        const result = await response.json();
        console.log("Cases", result);
        setCaseData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, session]);

  const onAddCaseClick = () => {
    setShowCaseUpdate(true);
  };

  const { totalCount, data } = caseData;

  return (
    <div className="flex w-full">
      <div className="border-r-[0.8px] w-[70%]">
        {/* profile complete sections */}
        <div>
          <div className="flex gap-[24px] ml-[32px] mr-[32px] mt-[32px]">
            <div>
              <svg
                width="128"
                height="128"
                viewBox="0 0 128 128"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="64" cy="64" r="64" fill="#F6F6F6" />
                <path
                  d="M64 128C80.9739 128 97.2525 121.257 109.255 109.255C121.257 97.2525 128 80.9739 128 64C128 47.0262 121.257 30.7475 109.255 18.7452C97.2525 6.74284 80.9739 3.30493e-06 64 0L64 64L64 128Z"
                  fill="#BD41FF"
                />
                <circle cx="64.0002" cy="65.1636" r="46.5455" fill="white" />
                <path
                  d="M47.3761 56.544H37.0081V62.016C37.4561 61.4613 38.0961 61.0133 38.9281 60.672C39.7601 60.3093 40.6455 60.128 41.5841 60.128C43.2908 60.128 44.6881 60.5013 45.7761 61.248C46.8641 61.9947 47.6535 62.9547 48.1441 64.128C48.6348 65.28 48.8801 66.5173 48.8801 67.84C48.8801 70.2933 48.1761 72.2667 46.7681 73.76C45.3815 75.2533 43.3975 76 40.8161 76C38.3841 76 36.4428 75.392 34.9921 74.176C33.5415 72.96 32.7201 71.3707 32.5281 69.408H36.8801C37.0721 70.2613 37.4988 70.944 38.1601 71.456C38.8428 71.968 39.7068 72.224 40.7521 72.224C42.0108 72.224 42.9601 71.8293 43.6001 71.04C44.2401 70.2507 44.5601 69.2053 44.5601 67.904C44.5601 66.5813 44.2295 65.5787 43.5681 64.896C42.9281 64.192 41.9788 63.84 40.7201 63.84C39.8241 63.84 39.0775 64.064 38.4801 64.512C37.8828 64.96 37.4561 65.5573 37.2001 66.304H32.9121V52.608H47.3761V56.544ZM52.2899 64.032C52.2899 60.3413 52.9512 57.4507 54.2739 55.36C55.6179 53.2693 57.8365 52.224 60.9299 52.224C64.0232 52.224 66.2312 53.2693 67.5539 55.36C68.8979 57.4507 69.5699 60.3413 69.5699 64.032C69.5699 67.744 68.8979 70.656 67.5539 72.768C66.2312 74.88 64.0232 75.936 60.9299 75.936C57.8365 75.936 55.6179 74.88 54.2739 72.768C52.9512 70.656 52.2899 67.744 52.2899 64.032ZM65.1539 64.032C65.1539 62.4533 65.0472 61.1307 64.8339 60.064C64.6419 58.976 64.2365 58.0907 63.6179 57.408C63.0205 56.7253 62.1245 56.384 60.9299 56.384C59.7352 56.384 58.8285 56.7253 58.2099 57.408C57.6125 58.0907 57.2072 58.976 56.9939 60.064C56.8019 61.1307 56.7059 62.4533 56.7059 64.032C56.7059 65.6533 56.8019 67.0187 56.9939 68.128C57.1859 69.216 57.5912 70.1013 58.2099 70.784C58.8285 71.4453 59.7352 71.776 60.9299 71.776C62.1245 71.776 63.0312 71.4453 63.6499 70.784C64.2685 70.1013 64.6739 69.216 64.8659 68.128C65.0579 67.0187 65.1539 65.6533 65.1539 64.032ZM72.4654 58.4C72.4654 56.7787 72.9347 55.5093 73.8734 54.592C74.8334 53.6747 76.06 53.216 77.5534 53.216C79.0467 53.216 80.2627 53.6747 81.2014 54.592C82.1614 55.5093 82.6414 56.7787 82.6414 58.4C82.6414 60.0427 82.1614 61.3227 81.2014 62.24C80.2627 63.1573 79.0467 63.616 77.5534 63.616C76.06 63.616 74.8334 63.1573 73.8734 62.24C72.9347 61.3227 72.4654 60.0427 72.4654 58.4ZM93.0094 53.6L80.4334 76H76.0814L88.6254 53.6H93.0094ZM77.5214 55.904C76.348 55.904 75.7614 56.736 75.7614 58.4C75.7614 60.0853 76.348 60.928 77.5214 60.928C78.0974 60.928 78.5454 60.7253 78.8654 60.32C79.1854 59.8933 79.3454 59.2533 79.3454 58.4C79.3454 56.736 78.7374 55.904 77.5214 55.904ZM86.5134 71.168C86.5134 69.5253 86.9827 68.256 87.9214 67.36C88.8814 66.4427 90.108 65.984 91.6014 65.984C93.0947 65.984 94.3 66.4427 95.2174 67.36C96.156 68.256 96.6254 69.5253 96.6254 71.168C96.6254 72.8107 96.156 74.0907 95.2174 75.008C94.3 75.9253 93.0947 76.384 91.6014 76.384C90.0867 76.384 88.86 75.9253 87.9214 75.008C86.9827 74.0907 86.5134 72.8107 86.5134 71.168ZM91.5694 68.672C90.3534 68.672 89.7454 69.504 89.7454 71.168C89.7454 72.8533 90.3534 73.696 91.5694 73.696C92.764 73.696 93.3614 72.8533 93.3614 71.168C93.3614 69.504 92.764 68.672 91.5694 68.672Z"
                  fill="#BD41FF"
                />
              </svg>
            </div>
            <div className="gap-[8px]">
              <p className="text-[16px] mb-[8px]">Welcome, {fullName}</p>
              <p className="text-[32px] mb-[8px]">
                Your profile is 50% complete.
              </p>
              <p className="text-[16px] text-gray-600">
                You still need to provide a few more details.
              </p>
            </div>
          </div>
          <div className="flex gap-[24px] ml-[32px] mr-[32px] mt-[32px] mb-[34px]">
            
            <Button
              className="w-full font-[600] bg-[#F6F6F6] shadow-none text-black"
              variant="text"
            >
              <Link href={'/settings/personal-info'}>
              Complete your profile{" "}
              </Link>
              
              <ArrowForwardIosOutlinedIcon className="w-[14px] ml-[8px]" />
            </Button>
            
            
          </div>
        </div>
        {/* Case Update sections */}
        <div className="mb-10">
          {totalCount === 0 ? <EmptyCase /> : <CaseUpdate />}
        </div>
      </div>
      <div className="ml-[32px] flex flex-col w-[30%]">
        <div>
          <h1 className="text-[24px] font-[600] mt-[32px]">Pending Quotes</h1>
          <p className="text-[16px] font-[400] text-gray-600">
            You have no pending quotes.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center h-full w-[100%]">
          <div className="justify-center items-center">
            <svg
              width="105"
              height="104"
              viewBox="0 0 105 104"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M74.1667 8.6665C77.6145 8.6665 80.9211 10.0361 83.3591 12.4741C85.797 14.9121 87.1667 18.2187 87.1667 21.6665V90.9998C87.1662 91.816 86.9352 92.6154 86.5003 93.3061C86.0654 93.9967 85.4443 94.5505 84.7085 94.9037C83.9727 95.2569 83.1521 95.3951 82.3412 95.3024C81.5304 95.2097 80.7621 94.8899 80.125 94.3798L72 87.8798L63.875 94.3798C63.0426 95.0467 61.9935 95.3831 60.9285 95.3248C59.8636 95.2664 58.8575 94.8173 58.103 94.0635L52.5 88.4605L46.897 94.0635C46.143 94.818 45.1373 95.2678 44.0723 95.327C43.0073 95.3861 41.9579 95.0505 41.125 94.3842L33 87.8798L24.875 94.3798C24.2379 94.8899 23.4697 95.2097 22.6588 95.3024C21.8479 95.3951 21.0273 95.2569 20.2915 94.9037C19.5557 94.5505 18.9346 93.9967 18.4997 93.3061C18.0648 92.6154 17.8338 91.816 17.8333 90.9998V21.6665C17.8333 18.2187 19.203 14.9121 21.6409 12.4741C24.0789 10.0361 27.3855 8.6665 30.8333 8.6665H74.1667Z"
                fill="#E1ABFF"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M65.5 34.6665H39.5C38.3955 34.6677 37.3332 35.0906 36.5301 35.8488C35.7269 36.607 35.2436 37.6433 35.1789 38.7459C35.1142 39.8485 35.4729 40.9341 36.1818 41.7811C36.8907 42.6281 37.8963 43.1724 38.993 43.3028L39.5 43.3332H65.5C66.6045 43.3319 67.6668 42.909 68.4699 42.1508C69.2731 41.3926 69.7564 40.3564 69.8211 39.2538C69.8858 38.1512 69.5271 37.0655 68.8182 36.2186C68.1093 35.3716 67.1037 34.8273 66.007 34.6968L65.5 34.6665ZM52.5 51.9998H39.5C38.3507 51.9998 37.2485 52.4564 36.4359 53.269C35.6232 54.0817 35.1667 55.1839 35.1667 56.3332C35.1667 57.4824 35.6232 58.5846 36.4359 59.3973C37.2485 60.21 38.3507 60.6665 39.5 60.6665H52.5C53.6493 60.6665 54.7515 60.21 55.5641 59.3973C56.3768 58.5846 56.8333 57.4824 56.8333 56.3332C56.8333 55.1839 56.3768 54.0817 55.5641 53.269C54.7515 52.4564 53.6493 51.9998 52.5 51.9998Z"
                fill="#BD41FF"
              />
            </svg>
          </div>
          <div>
            <p className="text-center mt-[16px] text-[18px] font-[500] text-gray-600">
              You have no pending quotes.
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
