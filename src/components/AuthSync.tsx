"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAdminToUser, getMe } from "@/services/authApi";
import { logout, setPermissions } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";

/** Refreshes role/permissions from the server when a token exists (e.g. after page reload). */
export default function AuthSync() {
  const dispatch = useDispatch();
  const token = useSelector((s: RootState) => s.auth.token);
  const done = useRef(false);

  useEffect(() => {
    if (!token || done.current) return;
    done.current = true;
    getMe()
      .then((data) => {
        if (data.success && data.admin && data.permissions) {
          dispatch(
            setPermissions({
              user: authAdminToUser(data.admin),
              permissions: data.permissions,
            })
          );
        }
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [dispatch, token]);

  return null;
}
