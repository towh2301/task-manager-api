export const hasPermission = (user: any, require: string[]) => {
	const userPermission = user?.permissions || [];
	return require.some((perm) => {
		userPermission.includes(perm);
	});
};
