import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education';
import Spinner from '../layout/Spinner';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    // window.localStorage.setItem('savedProfile', JSON.stringify(profile));
  }, [getCurrentProfile]);

  const flag = localStorage.getItem('savedProfile');
  const expFlag = localStorage.getItem('exp');
  const eduFlag = localStorage.getItem('edu');
  // console.log(eduFlag.length);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'>Welcome {user && user.name}</i>
      </p>
      {flag !== null ? (
        <Fragment>
          <DashboardAction />
          <p className='lead my-1'>
            <a href={`/profile/${user._id}`}>View Profile as guest</a>
          </p>
          {expFlag.length > 2 ? (
            <Experience experience={profile.experience} />
          ) : (
            <p className='component-missing'>No expereince found, Add some!</p>
          )}

          {eduFlag.length > 2 ? (
            <Education education={profile.education} />
          ) : (
            <p className='component-missing'>
              No education detail found, Add some!
            </p>
          )}
          <div className='my-2'>
            <button onClick={() => deleteAccount()} className='btn btn-danger'>
              <i className='fas fa-user-minus'></i> DELETE ACCOUNT PERMANENTLY
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p className='component-missing'>
            You have not yet setup a profile, please add some info
          </p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
