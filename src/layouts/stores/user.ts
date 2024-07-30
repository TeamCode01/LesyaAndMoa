import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
        currentChild: {},
        child: [],
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
                }
                this.currentUser = responseUser.data;
                this.isLoading = false;
            } catch (error) {
                console.log('an error occured ' + error);
                this.isLoading = false;
            }
        },

        async getChild() {
            try {
                const responseChild = await HTTP.get('children/');
                if (!Number.isInteger(localStorage.getItem('child'))) {
                    localStorage.setItem('child', responseChild.data.id);
                }
                this.currentChild = responseChild.data;
            } catch (error) {
                console.log('an error occured ' + error);
            }
        },
        async getChildId(id: Number) {
            try {
                const responseChildId = await HTTP.get(`children/${id}/`);
                this.child = responseChildId.data;
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

        logOut() {
            this.$reset();
        },
    },
});
