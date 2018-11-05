import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MemberListItem = ({
  member,
}) => (
  <article className="member-list-item">
    <Link
      to={`/members/${member.slug}`}
    >
      <div className="member-image">
        <img src={member.image} alt="member" />
      </div>
      <div className="member-name h6">{member.name}</div>
      <div className="member-chapter">{!member.chapter ? 'No Chapter' : member.chapter.name}</div>
    </Link>
  </article>
);

MemberListItem.propTypes = {
  member: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

MemberListItem.defaultProps = {
};

export default MemberListItem;
