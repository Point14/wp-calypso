type ApiResponse = {
	policies: {
		activity_log_limit_days: number;
	} | null;
};

export type DisplayRules = {
	visibleDays: number | null;
};

const fromApi = ( { policies }: ApiResponse ): DisplayRules => ( {
	visibleDays: policies?.activity_log_limit_days ?? null,
} );

export default fromApi;
