import { timelineData, whenLabel } from "./data/timelineData";

// Roles as plain rows: when on the left, the role in the middle, its logo on the right.
const Timeline = () => (
  <section>
    <h2 id="timeline" className="big scroll-mt-16">
      timeline
    </h2>

    <ol
      role="list"
      aria-labelledby="timeline"
      className="mt-7 border-t-[3px] border-rule md:mt-11"
    >
      {timelineData.map((entry) => (
        <li
          key={entry.title}
          className="grid grid-cols-[minmax(0,1fr)_56px] items-start gap-x-4 gap-y-3 border-b-[3px] border-rule pb-7 pt-[22px] md:grid-cols-[150px_minmax(0,1fr)_72px] md:gap-7 md:pb-9 md:pt-8"
        >
          <div className="col-span-full text-lg font-bold leading-[30px] md:col-span-1 md:pt-1.5">
            {entry.active ? (
              <span className="now">{whenLabel(entry)}</span>
            ) : (
              whenLabel(entry)
            )}
          </div>

          <div>
            <h3 className="text-[28px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[38px]">
              {entry.is_exp ? (
                <a
                  href={entry.is_exp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-transparent decoration-[3px] underline-offset-[6px] transition-colors hover:decoration-pink"
                >
                  {entry.title}
                </a>
              ) : (
                entry.title
              )}
            </h3>
            <p className="mt-[9px] font-bold lowercase leading-[1.3] text-soft">
              {entry.date.replace(" - ", " – ")} · {entry.location}
            </p>
            {entry.extra && (
              <p className="mt-1 font-bold lowercase leading-[1.3] text-soft">
                {entry.extra}
              </p>
            )}
            <p className="mt-3 max-w-[60ch] text-[16.5px] font-medium leading-normal md:text-lg">
              {entry.description}
            </p>
          </div>

          <img
            src={entry.logo}
            alt=""
            className="sticker h-14 w-14 rounded-[14px] object-cover md:h-[72px] md:w-[72px] md:rounded-[17px]"
          />
        </li>
      ))}
    </ol>
  </section>
);

export default Timeline;
