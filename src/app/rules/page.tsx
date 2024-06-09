import Card from "@/components/ui/Card";
import { getAllEvents } from "@/lib";
import { dateStarted, dateToMonthYearDisplay } from "@/utils";
import { CheckCircleIcon, ArrowRightIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import React from "react";
import { twMerge } from "tailwind-merge";

const Rules = async () => {
  const events = await getAllEvents();

  return (
    <div
      className={twMerge(
        "flex flex-row flex-wrap max-w-5xl mx-auto gap-6",
        "[&>div]:flex [&>div]:flex-col [&>div]:flex-1"
      )}
    >
      <div className="w-full md:w-1/2">
        <Card className="shadow-lg p-6 bg-base-100">
          <div className="stat">
            <div className="stat-figure text-primary">
              <button className="btn btn-primary btn-circle">
                <CreditCardIcon className="block w-8 h-8" />
                <span className="sr-only">Pay Now</span>
              </button>
            </div>
            <div className="stat-title">Cost per round</div>
            <div className="stat-value text-primary">$5.00</div>
            <div className="stat-desc">PayPal to @ChampionsLeagueRI</div>
          </div>
          <ul className="list-none mt-4 space-y-2">
            <li className="flex items-center gap-2">
              <span className="font-bold">$2.00</span>
              <ArrowRightIcon className="w-4 h-4" />
              <span>Local course improvements</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold">$1.00</span>
              <ArrowRightIcon className="w-4 h-4" />
              <span>Party Fund and End-of-year Banquet</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold">$2.00</span>
              <ArrowRightIcon className="w-4 h-4" />
              <span>Year-End prize fund</span>
            </li>
          </ul>
        </Card>

        <Card title="Divisions" className="shadow-lg p-6 bg-base-100 mt-6">
          <h3 className="text-md mb-2">
            As this is a new initiative, we will continuously evaluate and adjust the divisions as needed. Competitors
            will be categorized into three divisions.
          </h3>
          <ul className="flex flex-wrap justify-start gap-4 mb-4">
            <li><span className="badge badge-primary text-base p-4 rounded-2xl">Division 1</span></li>
            <li><span className="badge badge-primary text-base p-4 rounded-2xl">Division 2</span></li>
            <li><span className="badge badge-primary text-base p-4 rounded-2xl">Division 3</span></li>
          </ul>
        </Card>

        <Card title="Rules" className="shadow-lg p-6 bg-base-100 mt-6 prose">
          <ul className="list-disc">
            <li>Must play 9/12 months to be eligible</li>
            <li>Anyone who completes 9/12 months wins money</li>
            <li>Can play as many rounds / month as desired ($5 each)</li>
            <li>Send ALL Udisc Score Card to ChampionsLeagueRI@gmail.com</li>
            <li>Must have 2 people minimum on card to play CL</li>
            <li>Payment sent prior to start of round</li>
            <li>Any hole with a drop zone (CC 14), all OB throws off the tee go to the drop zone</li>
            <li>Ninigret OB will be reevaluated on a monthly basis, please monitor Facebook</li>
          </ul>
        </Card>
      </div>

      <div className="w-full md:w-1/2">
        <Card title="Course Schedule" className="shadow-lg p-6 bg-base-100">
          <ul className="space-y-4">
            {events
              .sort((a, b) => (a.time > b.time ? 1 : -1))
              .map((event, i) => (
                <li key={i} className="flex items-center gap-2">
                  {dateStarted(event.time) ? <CheckCircleIcon className="w-6 h-6 text-success" /> : <span className="w-6 h-6" />}
                  <time className="text-base font-medium">{dateToMonthYearDisplay(event.time)}</time>
                  <span className="text-base">{event.layout.course.name} - {event.layout.name}</span>
                </li>
              ))}
          </ul>
        </Card>

        <Card title="Background & Motivation" className="shadow-lg p-6 bg-base-100 mt-6 prose">
          <p>
            This was set up to allow a group of friends to generate some friendly disc golf competition in southern RI
            and throw a party the following year.
          </p>
          <p>
            We recognized this could be opened to the public, so we figured we’d give it a shot. The league is run on
            trust - trust that players will follow rules, trust that I won’t take your money and run to Mexico. We will
            adjust any rules we see fit, so be flexible and have fun. Feel free to reach out on Facebook with questions
            or suggestions.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Rules;
