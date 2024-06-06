import Card from "@/components/ui/Card";
import { dateStarted, dateToMonthYearDisplay } from "@/lib/date";
import { getAllEvents } from "@/lib/event";
import { CheckCircleIcon, ArrowRightIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import React from "react";
import { twMerge } from "tailwind-merge";

const Rules = async () => {
  const events = await getAllEvents();

  return (
    <div
      className={twMerge(
        "flex flex-row flex-wrap max-w-5xl mx-auto",
        "[&>div]:flex [&>div]:flex-col [&>div]:flex-1",
        "[&>div>div]:rounded-none [&>div>div]:w-full [&>div>div]:bg-transparent",
        "[&>div>div>div>.card-title]:mt-0 [&>div>div>div>.card-title]:mb-1"
      )}
    >
      <div>
        <Card
          className={twMerge(
            "[&>.card-body]:w-fit [&>.card-body]:mx-auto [&>.card-body]:items-center",
            "[&>div>.card-title]:w-full"
          )}
        >
          <div className="stat w-fit">
            <div className="stat-figure text-primary">
              <button className="btn h-fit">
                <CreditCardIcon className="block w-12 h-12 stroke-current" />
                <span className="sr-only">Pay Now</span>
              </button>
            </div>
            <div className="stat-title">Cost per round</div>
            <div className="stat-value text-primary">$5.00</div>
            <div className="stat-desc">PayPal to @ChampionsLeagueRI</div>
          </div>
          <ul
            className={twMerge(
              "[&>li]:flex [&>li]:items-center [&>li]:gap-1",
              "[&>li>svg]:w-4 [&>li>svg]:h-4",
              "[&>li>*]:inline-block",
              "[&>li>span:first-child]:font-bold"
            )}
          >
            <li>
              <span>$2.00</span>
              <ArrowRightIcon />
              <span>Local course improvements</span>
            </li>
            <li>
              <span>$1.00</span>
              <ArrowRightIcon />
              <span>Party Fund and End-of-year Banquet</span>
            </li>
            <li>
              <span>$2.00</span>
              <ArrowRightIcon />
              <span>Year-End prize fund</span>
            </li>
          </ul>
        </Card>

        <Card title="Divisions" className="relative">
          <h3 className="text-md mb-2">
            As this is a new initiative, we will continuously evaluate and adjust the divisions as needed. Competitors
            will be categorized into three divisions.
          </h3>
          <ul
            className={twMerge(
              "flex flex-wrap justify-start gap-4 mb-4",
              "[&>li>span]:badge [&>li>span]:badge-primary [&>li>span]:text-base [&>li>span]:p-4 [&>li>span]:rounded-2xl"
            )}
          >
            <li>
              <span>Division 1</span>
            </li>
            <li>
              <span>Division 2</span>
            </li>
            <li>
              <span>Division 3</span>
            </li>
          </ul>
        </Card>

        <Card title="Rules" className={twMerge("prose h-fit")}>
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

      <div>
        <Card title="Course Schedule">
          <ul className="[&>li]:my-6">
            {events
              .sort((a, b) => (a.time > b.time ? 1 : -1))
              .map((event, i) => (
                <li key={i} className="flex items-center gap-1">
                  {dateStarted(event.time) ? <CheckCircleIcon className="w-6 h-6" /> : <span className="w-6 h-6" />}
                  <time>{dateToMonthYearDisplay(event.time)}</time>
                  <span>
                    {event.layout.course.name} - {event.layout.name}
                  </span>
                </li>
              ))}
          </ul>
        </Card>

        <Card title="Background & Motivation" className={twMerge("prose", "[&>div>.card-title]:mt-0 [&>div>p]:mt-0")}>
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
