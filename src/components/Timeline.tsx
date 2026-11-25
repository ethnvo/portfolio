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
      className="mt-7 border-t-[0.1875rem] border-rule md:mt-11"
    >
      {timelineData.map((entry) => (
        <li
          key={entry.title}
          className="grid grid-cols-[minmax(0,1fr)_3.5rem] items-start gap-x-4 gap-y-3 border-b-[0.1875rem] border-rule pb-7 pt-[1.375rem] md:grid-cols-[9.375rem_minmax(0,1fr)_4.5rem] md:gap-7 md:pb-9 md:pt-8"
        >
          <div className="col-span-full text-lg font-bold leading-[1.875rem] md:col-span-1 md:pt-1.5">
            {entry.active ? (
              <span className="now">{whenLabel(entry)}</span>
            ) : (
              whenLabel(entry)
            )}
          </div>

          <div>
            <h3 className="text-[1.75rem] font-bold leading-[1.05] tracking-[-0.03em] md:text-[2.375rem]">
              {entry.is_exp ? (
                <a
                  href={entry.is_exp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-transparent decoration-[0.1875rem] underline-offset-[0.375rem] transition-colors hover:decoration-pink"
                >
                  {entry.title}
                </a>
              ) : (
                entry.title
              )}
            </h3>
            <p className="mt-[0.5625rem] font-bold lowercase leading-[1.3] text-soft">
              {entry.date.replace(" - ", " – ")} · {entry.location}
            </p>
            {entry.extra && (
              <p className="mt-1 font-bold lowercase leading-[1.3] text-soft">
                {entry.extra}
              </p>
            )}
            <p className="mt-3 max-w-[60ch] text-pretty text-[1.03125rem] font-medium leading-normal md:text-lg md:leading-7">
              {entry.description}
            </p>
          </div>

          <img
            src={entry.logo}
            alt=""
            className="sticker h-14 w-14 rounded-[0.875rem] object-cover md:h-[4.5rem] md:w-[4.5rem] md:rounded-[1.0625rem]"
          />
        </li>
      ))}
    </ol>
  </section>
);

export default Timeline;
