import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
        currentChild: {},
        children: [],
        groups: [],
        currentGroup: {},
        users: [],
        currentUser: {},
        isLoading: false,
    }),
    actions: {
        async getUser() {
            try {
                this.isLoading = true;
                const responseUser = await HTTP.get('users/me/');
                if (!Number.isInteger(localStorage.getItem('user'))) {
                    localStorage.setItem('user', responseUser.data.id);
                    localStorage.setItem('type', responseUser.data.tasks_type);
                }
                this.currentUser = responseUser.data;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },

        async getChildren() {
            try {
                const responseChildren = await HTTP.get('children/');
                this.children = responseChildren.data;
            } catch (error) {
                console.log('an error occured ' + error);
            }
        },
        async getChildId(id: Number) {
            try {
                const responseChildId = await HTTP.get(`children/${id}/`);
                this.currentChild = responseChildId.data;
            } catch (error) {
                console.log('an error occured ' + error);
            }
        },

        async getUserId(id: Number) {
            try {
                this.isLoading = true;
                setTimeout(async () => {
                    const responseUserId = await HTTP.get(`users/${id}/`);
                    this.user = responseUserId.data;
                    this.isLoading = false;
                }, 10);
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },

        async getUsers() {
            try {
                this.isLoading = true;
                setTimeout(async () => {
                    const responseUsers = await HTTP.get(`users/`);
                    this.users = responseUsers.data;
                    this.isLoading = false;
                }, 10);
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
        async getGroups() {
            try {
                const responseGroups = await HTTP.get('groups/');
                this.groups = responseGroups.data;
            } catch (error) {
                console.log('an error occured ' + error);
            }
        },
        async getGroupId(id: Number) {
            try {
                const responseGroupId = await HTTP.get(`groups/${id}/`);
                this.currentGroup = responseGroupId.data;
            } catch (error) {
                console.log('an error occured ' + error);
            }
        },

        logOut() {
            this.$reset();
        },
    },
});
