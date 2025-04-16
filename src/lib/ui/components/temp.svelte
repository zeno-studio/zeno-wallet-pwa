


<style lang="postcss">
	.logo-link {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 0.8rem;
	}
	.logo {
		height: 3.2rem;
		width: 3.2rem;
		color: var(--color);
		fill: var(--pink);
	}
	.label-mwitch {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		font-size: 1.4rem;
		font-weight: 600;
		margin-left: 1rem;
		color: var(--color);
	}
	.chain-logo {
		position: absolute;
		box-sizing: border-box;
		width: 1.4rem;
		height: 1.4rem;
		bottom: 0;
		right: 0;
		border-radius: 50%;
		padding: 0px;
		background-color: #fff;
	}
	.nav {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-flow: row;
		width: 100%;
		position: fixed;
		height: 6.4rem;
		top: 0px;
		background: transparent;
		backdrop-filter: blur(30px);
		z-index: 100;
	}
	.nav-wrapper {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 100%;
		width: 96%;
	}
	.logo {
		border-radius: 0.8rem;
		width: 3.6rem;
		height: 3.6rem;
		padding: 0px;
		border: none;
		background: none;
	}
	.dropdown {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		position: fixed;
		top: 6.4rem;
		width: 100%;
		height: 100vh;
		background: var(--bg);
		border-radius: 1.6rem;
		padding: 2rem;
		z-index: 1000;
		border: 1px solid var(--bg3);
		margin: 0;
	}

	.navRight {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: absolute;
		right: 0;
		border: none;
		box-sizing: border-box;
	}
	.accountButton {
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		font-size: 1.8rem;
		font-weight: 500;
		height: 2.4rem;
		border: none;
		background: none;
		box-sizing: border-box;
		color: var(--text);
	}

	.accountButton:hover {
		cursor: pointer;
		color: var(--color);
	}

	.accountButtonRight {
		display: flex;
		position: absolute;
		right: 1rem;
		justify-content: flex-start;
		align-items: center;
		color: var(--text);
		font-size: 1.6rem;
		font-weight: 500;
		border-radius: 2rem;
		border: 1px solid var(--bg3);
		background: var(--bg1);
		color: var(--text);
	}
	.accountButtonRight:hover {
		cursor: pointer;
		color: var(--color);
	}

	.accountLeft {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.dropdown-label {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		padding: 1rem;
		margin: 0rem;
	}
	.setting-btn {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: absolute;
		right: 1rem;
		padding: 0rem;
		margin-right: 1rem;
		border: none;
		background: none;
	}
	.account-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
	}
	.avatar {
		position: relative;
		box-sizing: border-box;
		flex-shrink: 0;
		width: 3rem;
		height: 3rem;
		margin-left: -0.4rem;
		margin-right: 0.8rem;
		border-radius: 50%;
		padding: 0px;
		background-color: #fff;
		border: 2px solid var(--bg3);
	}

	.account-entry {
		position: relative;
		display: flex;

		justify-content: flex-start;
		box-sizing: border-box;
		width: 100%;
		flex-direction: row;
		background: none;
		border: none;
		margin-bottom: 0.8rem;
	}
	.selected {
		background: var(--success);
	}
	.label {
		margin: 0px;
		padding: 0px;
		font-size: 1.6rem;
	}
	.account-btn {
		display: flex;
		font-size: 1.8rem;
		font-weight: 500;
		padding: 1rem;
		align-items: center;
		justify-content: flex-start;
		flex-direction: row;
		background: var(--bg1);
		border: none;
		border-top-left-radius: 1.6rem;
		border-bottom-left-radius: 1.6rem;
		cursor: pointer;
		color: var(--color);
		&:hover {
			background: var(--bg2);
		}
		&.selected {
			background: var(--success);
		}
	}
	.label-right {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		background: var(--bg1);
		border: none;
		border-top-right-radius: 1.6rem;
		border-bottom-right-radius: 1.6rem;
		cursor: pointer;
		color: var(--color);
		&:hover {
			background: var(--bg2);
		}
		&.selected {
			background: var(--success);
		}
	}
</style>
