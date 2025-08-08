import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const UserList = ({ filters }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const params = {
        page,
        size: pageSize,
        ...filters
      };
      const res = await axiosInstance.get('/userdetails/getAllUser/filter', { params });
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters, page,users]);

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/userdetails/${userId}`);
      setUsers(prev => prev.filter(user => user.userDetailsId !== userId));
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  const handleBlockUser = async (user) => {
    try {
        await axiosInstance.patch(`/userdetails/blockUser/${user.user.userId}`);
        setUsers(prev =>
        prev.map(u =>
            u.userId === user.user.userId ? { ...u, blocked: !u.blocked } : u
        )
        );
    } catch (err) {
        console.error('Failed to update user block status', err);
    }
  };

  return (
    <div className="p-4 overflow-auto">
      <h4 className="mb-4 text-center fw-bold">User List</h4>

      {users.map(user => (
        <div key={user.user.userId} className="card mb-3 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold">{user.user.userName}</h5>
              <p className="mb-0"><strong>Email:</strong> {user.user.userEmail}</p>
              <p className="mb-0"><strong>Phone:</strong> {user.phoneNumber}</p>
              <p className="mb-0"><strong>Gender:</strong> {user.gender}</p>
              {console.log(user.blocked)}
              <p className="mb-0"><strong>Status:</strong> {user.blocked ? 'Blocked' : 'Active'}</p>
            </div>
            <div>
              <button
                className={`btn btn-sm me-2 ${user.blocked ? 'btn-success' : 'btn-danger'}`}
                onClick={() => handleBlockUser(user)}
              >
                {user.blocked ? 'Unblock' : 'Block'}
              </button>
              {console.log(user.userDetailsId)}
              <button
                className="btn btn-outline-danger btn-sm me-2"
                onClick={() => handleDeleteUser(user.userDetailsId)}
              >
                Delete
              </button>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/viewprofile/${user.user.userId}`)}
                    >
                    View Profile
                </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="align-self-center">Page {page + 1} of {totalPages}</span>
        <button
          className="btn btn-outline-secondary ms-2"
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const UserList = ({ filters }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const params = {
        page,
        size: pageSize,
        ...filters
      };
      const res = await axiosInstance.get('/userdetails/getAllUser/filter', { params });
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters, page,users]);

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/userdetails/${userId}`);
      setUsers(prev => prev.filter(user => user.userDetailsId !== userId));
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  const handleBlockUser = async (user) => {
    try {
        await axiosInstance.patch(`/userdetails/blockUser/${user.user.userId}`);
        setUsers(prev =>
        prev.map(u =>
            u.userId === user.user.userId ? { ...u, blocked: !u.blocked } : u
        )
        );
    } catch (err) {
        console.error('Failed to update user block status', err);
    }
  };

  return (
    <div className="p-4 overflow-auto">
      <h4 className="mb-4 text-center fw-bold">User List</h4>

      {users.map(user => (
        <div key={user.user.userId} className="card mb-3 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold">{user.user.userName}</h5>
              <p className="mb-0"><strong>Email:</strong> {user.user.userEmail}</p>
              <p className="mb-0"><strong>Phone:</strong> {user.phoneNumber}</p>
              <p className="mb-0"><strong>Gender:</strong> {user.gender}</p>
              {console.log(user.blocked)}
              <p className="mb-0"><strong>Status:</strong> {user.blocked ? 'Blocked' : 'Active'}</p>
            </div>
            <div>
              <button
                className={`btn btn-sm me-2 ${user.blocked ? 'btn-success' : 'btn-danger'}`}
                onClick={() => handleBlockUser(user)}
              >
                {user.blocked ? 'Unblock' : 'Block'}
              </button>
              {console.log(user.userDetailsId)}
              <button
                className="btn btn-outline-danger btn-sm me-2"
                onClick={() => handleDeleteUser(user.userDetailsId)}
              >
                Delete
              </button>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/viewprofile/${user.user.userId}`)}
                    >
                    View Profile
                </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="align-self-center">Page {page + 1} of {totalPages}</span>
        <button
          className="btn btn-outline-secondary ms-2"
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const UserList = ({ filters }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const params = {
        page,
        size: pageSize,
        ...filters
      };
      const res = await axiosInstance.get('/userdetails/getAllUser/filter', { params });
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters, page,users]);

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/userdetails/${userId}`);
      setUsers(prev => prev.filter(user => user.userDetailsId !== userId));
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  const handleBlockUser = async (user) => {
    try {
        await axiosInstance.patch(`/userdetails/blockUser/${user.user.userId}`);
        setUsers(prev =>
        prev.map(u =>
            u.userId === user.user.userId ? { ...u, blocked: !u.blocked } : u
        )
        );
    } catch (err) {
        console.error('Failed to update user block status', err);
    }
  };

  return (
    <div className="p-4 overflow-auto">
      <h4 className="mb-4 text-center fw-bold">User List</h4>

      {users.map(user => (
        <div key={user.user.userId} className="card mb-3 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold">{user.user.userName}</h5>
              <p className="mb-0"><strong>Email:</strong> {user.user.userEmail}</p>
              <p className="mb-0"><strong>Phone:</strong> {user.phoneNumber}</p>
              <p className="mb-0"><strong>Gender:</strong> {user.gender}</p>
              {console.log(user.blocked)}
              <p className="mb-0"><strong>Status:</strong> {user.blocked ? 'Blocked' : 'Active'}</p>
            </div>
            <div>
              <button
                className={`btn btn-sm me-2 ${user.blocked ? 'btn-success' : 'btn-danger'}`}
                onClick={() => handleBlockUser(user)}
              >
                {user.blocked ? 'Unblock' : 'Block'}
              </button>
              {console.log(user.userDetailsId)}
              <button
                className="btn btn-outline-danger btn-sm me-2"
                onClick={() => handleDeleteUser(user.userDetailsId)}
              >
                Delete
              </button>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/viewprofile/${user.user.userId}`)}
                    >
                    View Profile
                </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="align-self-center">Page {page + 1} of {totalPages}</span>
        <button
          className="btn btn-outline-secondary ms-2"
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const UserList = ({ filters }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const params = {
        page,
        size: pageSize,
        ...filters
      };
      const res = await axiosInstance.get('/userdetails/getAllUser/filter', { params });
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters, page,users]);

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/userdetails/${userId}`);
      setUsers(prev => prev.filter(user => user.userDetailsId !== userId));
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  const handleBlockUser = async (user) => {
    try {
        await axiosInstance.patch(`/userdetails/blockUser/${user.user.userId}`);
        setUsers(prev =>
        prev.map(u =>
            u.userId === user.user.userId ? { ...u, blocked: !u.blocked } : u
        )
        );
    } catch (err) {
        console.error('Failed to update user block status', err);
    }
  };

  return (
    <div className="p-4 overflow-auto">
      <h4 className="mb-4 text-center fw-bold">User List</h4>

      {users.map(user => (
        <div key={user.user.userId} className="card mb-3 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold">{user.user.userName}</h5>
              <p className="mb-0"><strong>Email:</strong> {user.user.userEmail}</p>
              <p className="mb-0"><strong>Phone:</strong> {user.phoneNumber}</p>
              <p className="mb-0"><strong>Gender:</strong> {user.gender}</p>
              {console.log(user.blocked)}
              <p className="mb-0"><strong>Status:</strong> {user.blocked ? 'Blocked' : 'Active'}</p>
            </div>
            <div>
              <button
                className={`btn btn-sm me-2 ${user.blocked ? 'btn-success' : 'btn-danger'}`}
                onClick={() => handleBlockUser(user)}
              >
                {user.blocked ? 'Unblock' : 'Block'}
              </button>
              {console.log(user.userDetailsId)}
              <button
                className="btn btn-outline-danger btn-sm me-2"
                onClick={() => handleDeleteUser(user.userDetailsId)}
              >
                Delete
              </button>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/viewprofile/${user.user.userId}`)}
                    >
                    View Profile
                </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="align-self-center">Page {page + 1} of {totalPages}</span>
        <button
          className="btn btn-outline-secondary ms-2"
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const UserList = ({ filters }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const params = {
        page,
        size: pageSize,
        ...filters
      };
      const res = await axiosInstance.get('/userdetails/getAllUser/filter', { params });
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters, page,users]);

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/userdetails/${userId}`);
      setUsers(prev => prev.filter(user => user.userDetailsId !== userId));
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  const handleBlockUser = async (user) => {
    try {
        await axiosInstance.patch(`/userdetails/blockUser/${user.user.userId}`);
        setUsers(prev =>
        prev.map(u =>
            u.userId === user.user.userId ? { ...u, blocked: !u.blocked } : u
        )
        );
    } catch (err) {
        console.error('Failed to update user block status', err);
    }
  };

  return (
    <div className="p-4 overflow-auto">
      <h4 className="mb-4 text-center fw-bold">User List</h4>

      {users.map(user => (
        <div key={user.user.userId} className="card mb-3 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold">{user.user.userName}</h5>
              <p className="mb-0"><strong>Email:</strong> {user.user.userEmail}</p>
              <p className="mb-0"><strong>Phone:</strong> {user.phoneNumber}</p>
              <p className="mb-0"><strong>Gender:</strong> {user.gender}</p>
              {console.log(user.blocked)}
              <p className="mb-0"><strong>Status:</strong> {user.blocked ? 'Blocked' : 'Active'}</p>
            </div>
            <div>
              <button
                className={`btn btn-sm me-2 ${user.blocked ? 'btn-success' : 'btn-danger'}`}
                onClick={() => handleBlockUser(user)}
              >
                {user.blocked ? 'Unblock' : 'Block'}
              </button>
              {console.log(user.userDetailsId)}
              <button
                className="btn btn-outline-danger btn-sm me-2"
                onClick={() => handleDeleteUser(user.userDetailsId)}
              >
                Delete
              </button>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/viewprofile/${user.user.userId}`)}
                    >
                    View Profile
                </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="align-self-center">Page {page + 1} of {totalPages}</span>
        <button
          className="btn btn-outline-secondary ms-2"
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const UserList = ({ filters }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const params = {
        page,
        size: pageSize,
        ...filters
      };
      const res = await axiosInstance.get('/userdetails/getAllUser/filter', { params });
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters, page,users]);

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/userdetails/${userId}`);
      setUsers(prev => prev.filter(user => user.userDetailsId !== userId));
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  const handleBlockUser = async (user) => {
    try {
        await axiosInstance.patch(`/userdetails/blockUser/${user.user.userId}`);
        setUsers(prev =>
        prev.map(u =>
            u.userId === user.user.userId ? { ...u, blocked: !u.blocked } : u
        )
        );
    } catch (err) {
        console.error('Failed to update user block status', err);
    }
  };

  return (
    <div className="p-4 overflow-auto">
      <h4 className="mb-4 text-center fw-bold">User List</h4>

      {users.map(user => (
        <div key={user.user.userId} className="card mb-3 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold">{user.user.userName}</h5>
              <p className="mb-0"><strong>Email:</strong> {user.user.userEmail}</p>
              <p className="mb-0"><strong>Phone:</strong> {user.phoneNumber}</p>
              <p className="mb-0"><strong>Gender:</strong> {user.gender}</p>
              {console.log(user.blocked)}
              <p className="mb-0"><strong>Status:</strong> {user.blocked ? 'Blocked' : 'Active'}</p>
            </div>
            <div>
              <button
                className={`btn btn-sm me-2 ${user.blocked ? 'btn-success' : 'btn-danger'}`}
                onClick={() => handleBlockUser(user)}
              >
                {user.blocked ? 'Unblock' : 'Block'}
              </button>
              {console.log(user.userDetailsId)}
              <button
                className="btn btn-outline-danger btn-sm me-2"
                onClick={() => handleDeleteUser(user.userDetailsId)}
              >
                Delete
              </button>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/viewprofile/${user.user.userId}`)}
                    >
                    View Profile
                </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="align-self-center">Page {page + 1} of {totalPages}</span>
        <button
          className="btn btn-outline-secondary ms-2"
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const UserList = ({ filters }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const params = {
        page,
        size: pageSize,
        ...filters
      };
      const res = await axiosInstance.get('/userdetails/getAllUser/filter', { params });
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters, page,users]);

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/userdetails/${userId}`);
      setUsers(prev => prev.filter(user => user.userDetailsId !== userId));
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  const handleBlockUser = async (user) => {
    try {
        await axiosInstance.patch(`/userdetails/blockUser/${user.user.userId}`);
        setUsers(prev =>
        prev.map(u =>
            u.userId === user.user.userId ? { ...u, blocked: !u.blocked } : u
        )
        );
    } catch (err) {
        console.error('Failed to update user block status', err);
    }
  };

  return (
    <div className="p-4 overflow-auto">
      <h4 className="mb-4 text-center fw-bold">User List</h4>

      {users.map(user => (
        <div key={user.user.userId} className="card mb-3 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold">{user.user.userName}</h5>
              <p className="mb-0"><strong>Email:</strong> {user.user.userEmail}</p>
              <p className="mb-0"><strong>Phone:</strong> {user.phoneNumber}</p>
              <p className="mb-0"><strong>Gender:</strong> {user.gender}</p>
              {console.log(user.blocked)}
              <p className="mb-0"><strong>Status:</strong> {user.blocked ? 'Blocked' : 'Active'}</p>
            </div>
            <div>
              <button
                className={`btn btn-sm me-2 ${user.blocked ? 'btn-success' : 'btn-danger'}`}
                onClick={() => handleBlockUser(user)}
              >
                {user.blocked ? 'Unblock' : 'Block'}
              </button>
              {console.log(user.userDetailsId)}
              <button
                className="btn btn-outline-danger btn-sm me-2"
                onClick={() => handleDeleteUser(user.userDetailsId)}
              >
                Delete
              </button>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/viewprofile/${user.user.userId}`)}
                    >
                    View Profile
                </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="align-self-center">Page {page + 1} of {totalPages}</span>
        <button
          className="btn btn-outline-secondary ms-2"
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const UserList = ({ filters }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const params = {
        page,
        size: pageSize,
        ...filters
      };
      const res = await axiosInstance.get('/userdetails/getAllUser/filter', { params });
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters, page,users]);

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/userdetails/${userId}`);
      setUsers(prev => prev.filter(user => user.userDetailsId !== userId));
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  const handleBlockUser = async (user) => {
    try {
        await axiosInstance.patch(`/userdetails/blockUser/${user.user.userId}`);
        setUsers(prev =>
        prev.map(u =>
            u.userId === user.user.userId ? { ...u, blocked: !u.blocked } : u
        )
        );
    } catch (err) {
        console.error('Failed to update user block status', err);
    }
  };

  return (
    <div className="p-4 overflow-auto">
      <h4 className="mb-4 text-center fw-bold">User List</h4>

      {users.map(user => (
        <div key={user.user.userId} className="card mb-3 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold">{user.user.userName}</h5>
              <p className="mb-0"><strong>Email:</strong> {user.user.userEmail}</p>
              <p className="mb-0"><strong>Phone:</strong> {user.phoneNumber}</p>
              <p className="mb-0"><strong>Gender:</strong> {user.gender}</p>
              {console.log(user.blocked)}
              <p className="mb-0"><strong>Status:</strong> {user.blocked ? 'Blocked' : 'Active'}</p>
            </div>
            <div>
              <button
                className={`btn btn-sm me-2 ${user.blocked ? 'btn-success' : 'btn-danger'}`}
                onClick={() => handleBlockUser(user)}
              >
                {user.blocked ? 'Unblock' : 'Block'}
              </button>
              {console.log(user.userDetailsId)}
              <button
                className="btn btn-outline-danger btn-sm me-2"
                onClick={() => handleDeleteUser(user.userDetailsId)}
              >
                Delete
              </button>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/viewprofile/${user.user.userId}`)}
                    >
                    View Profile
                </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="align-self-center">Page {page + 1} of {totalPages}</span>
        <button
          className="btn btn-outline-secondary ms-2"
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const UserList = ({ filters }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const params = {
        page,
        size: pageSize,
        ...filters
      };
      const res = await axiosInstance.get('/userdetails/getAllUser/filter', { params });
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters, page,users]);

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/userdetails/${userId}`);
      setUsers(prev => prev.filter(user => user.userDetailsId !== userId));
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  const handleBlockUser = async (user) => {
    try {
        await axiosInstance.patch(`/userdetails/blockUser/${user.user.userId}`);
        setUsers(prev =>
        prev.map(u =>
            u.userId === user.user.userId ? { ...u, blocked: !u.blocked } : u
        )
        );
    } catch (err) {
        console.error('Failed to update user block status', err);
    }
  };

  return (
    <div className="p-4 overflow-auto">
      <h4 className="mb-4 text-center fw-bold">User List</h4>

      {users.map(user => (
        <div key={user.user.userId} className="card mb-3 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold">{user.user.userName}</h5>
              <p className="mb-0"><strong>Email:</strong> {user.user.userEmail}</p>
              <p className="mb-0"><strong>Phone:</strong> {user.phoneNumber}</p>
              <p className="mb-0"><strong>Gender:</strong> {user.gender}</p>
              {console.log(user.blocked)}
              <p className="mb-0"><strong>Status:</strong> {user.blocked ? 'Blocked' : 'Active'}</p>
            </div>
            <div>
              <button
                className={`btn btn-sm me-2 ${user.blocked ? 'btn-success' : 'btn-danger'}`}
                onClick={() => handleBlockUser(user)}
              >
                {user.blocked ? 'Unblock' : 'Block'}
              </button>
              {console.log(user.userDetailsId)}
              <button
                className="btn btn-outline-danger btn-sm me-2"
                onClick={() => handleDeleteUser(user.userDetailsId)}
              >
                Delete
              </button>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/viewprofile/${user.user.userId}`)}
                    >
                    View Profile
                </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="align-self-center">Page {page + 1} of {totalPages}</span>
        <button
          className="btn btn-outline-secondary ms-2"
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;

