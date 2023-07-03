type Props = {
  title: string;
  desc: string;
};

const ListHeader: React.FC<Props> = ({ title, desc }) => (
  <div className="pb-3">
    <h4 className="m-0">{title}</h4>
    <small>{desc}</small>
  </div>
);

export default ListHeader;
