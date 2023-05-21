import classnames from 'classnames';

export default function SidebarHeaderControls({ isDarkMode, className }) {
  return (
    <div className={classnames('group/sidebar-header-controls flex flex-row gap-2.5', className)}>
      {Array.from({ length: 3 }, (_, i) => ({ id: i })).map((arr) => (
        <div
          key={`sidebar-header-controls__item-${arr.id}`}
          className={classnames(
            `group-hover/sidebar-header-controls:before:opacity-100
            group-hover/sidebar-header-controls:after:opacity-100

            relative

            h-3 w-3
            rounded-full

            before:absolute
            before:opacity-0
            before:content-['']

            after:absolute
            after:opacity-0
            after:content-['']

            [&:nth-child(1)]:bg-[#FF6157]
            [&:nth-child(1)]:ring-[#E24640]
            [&:nth-child(1)]:before:top-[5px]
            [&:nth-child(1)]:before:left-[2px]
            [&:nth-child(1)]:before:h-0.5
            [&:nth-child(1)]:before:w-2
            [&:nth-child(1)]:before:rotate-45
            [&:nth-child(1)]:before:rounded-full
            [&:nth-child(1)]:before:bg-black/[0.4]
            [&:nth-child(1)]:after:top-[5px]
            [&:nth-child(1)]:after:left-[2px]
            [&:nth-child(1)]:after:h-0.5
            [&:nth-child(1)]:after:w-2
            [&:nth-child(1)]:after:-rotate-45
            [&:nth-child(1)]:after:rounded-full
            [&:nth-child(1)]:after:bg-black/[0.4]

            [&:nth-child(2)]:bg-[#FFC12F]
            [&:nth-child(2)]:ring-[#DFA023]
            [&:nth-child(2)]:before:top-[5px]
            [&:nth-child(2)]:before:left-[2px]
            [&:nth-child(2)]:before:h-0.5
            [&:nth-child(2)]:before:w-2
            [&:nth-child(2)]:before:rounded-full
            [&:nth-child(2)]:before:bg-black/[0.4]

            [&:nth-child(3)]:bg-[#2ACB42]
            [&:nth-child(3)]:ring-[#1BAC2C]
            [&:nth-child(3)]:before:top-[3px]
            [&:nth-child(3)]:before:left-[3px]
            [&:nth-child(3)]:before:border-[2px]
            [&:nth-child(3)]:before:border-solid
            [&:nth-child(3)]:before:border-t-black/[0.4]
            [&:nth-child(3)]:before:border-l-black/[0.4]
            [&:nth-child(3)]:before:border-b-transparent
            [&:nth-child(3)]:before:border-r-transparent
            [&:nth-child(3)]:after:top-[4.5px]
            [&:nth-child(3)]:after:left-[4.5px]
            [&:nth-child(3)]:after:border-[2px]
            [&:nth-child(3)]:after:border-solid
            [&:nth-child(3)]:after:border-b-black/[0.4]
            [&:nth-child(3)]:after:border-r-black/[0.4]
            [&:nth-child(3)]:after:border-t-transparent
            [&:nth-child(3)]:after:border-l-transparent`,
            {
              // remove rings in Dark mode
              '[&:nth-child(1)]:ring-1 [&:nth-child(2)]:ring-1 [&:nth-child(3)]:ring-1':
                !isDarkMode,
              '[&:nth-child(1)]:ring-0 [&:nth-child(2)]:ring-0 [&:nth-child(3)]:ring-0': isDarkMode,
            },
          )}
        />
      ))}
    </div>
  );
}
