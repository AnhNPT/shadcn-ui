interface IBadge {
  color?: string;
  type?: 'transparent' | 'solid' | 'blur';
  isFullwidth?: boolean;
  title?: string;
  bullet?: boolean;
}

const SBadgeBeta = (props: IBadge) => {
  const { color = 'primary', type = 'transparent', isFullwidth, title, bullet } = props;
  return (
    <div
      className={`badge_wrapper  ${isFullwidth ? 'w_full ' : ''}
       ${type}_${color}`}>
      {bullet ? <div className={'bullet '} /> : ''}
      <span className={'text_xs_medium '}>{title}</span>
    </div>
  );
};

export default SBadgeBeta;
