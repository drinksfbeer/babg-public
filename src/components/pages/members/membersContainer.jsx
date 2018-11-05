import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import MemberDetails from '../../resources/members/details/memberDetails';
import MembersList from '../../resources/members/list/membersList';
import MembersLocation from '../../resources/members/locations/locations';

const MembersContainer = ({
  members,
  chapters,
}) => ([
  <Route
    exact
    key="members-list"
    path="/members"
    render={() => (
      <MembersList members={members} chapters={chapters} />
    )}
  />,
  <Route
    key="member-details"
    exact
    path="/members/:slug/"
    render={({
      match: {
        params: {
          slug,
        },
      },
    }) => {
      const foundMember = members.find(member => member.slug === slug);
      if (!foundMember) return null;

      return (
        <MemberDetails member={foundMember} />
      );
    }}
  />,
  <Route
    key="member-location"
    exact
    path="/members/:slug/:name"
    render={({
    match: {
      params: {
        slug,
        name,
      },
    },
  }) => {
    const foundMember = members.find(member => member.slug === slug);
    if (!foundMember) return null;

    return (
      <MembersLocation brewery={foundMember} name={name} />
    );
  }}
  />,
]);

MembersContainer.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({})),
};
MembersContainer.defaultProps = {
  members: [],
};
export default connect(
  state => ({
    members: state.members.list._list,
    chapters: state.chapters.list._list,
  }),
  null,
  null,
  { pure: false },
)(MembersContainer);
